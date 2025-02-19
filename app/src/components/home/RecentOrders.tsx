import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet
} from 'react-native';
import { useUserOrdersQuery } from '../../types/api';
import textStyles from '../../styles/text';

const getStatusColor = (status?: string | null) => {
	// switch (status) {
	// 	case OrderStatus.Pending:
	// 		return '#ba9b03';
	// 	case OrderStatus.Processing:
	// 		return '#C4C4C4';
	// 	case OrderStatus.Fulfilled:
	// 		return '#7dba03';
	// }
	if (status) {
		return 'gray';
	}
};

const RecentOrders = () => {
	const [{ data }] = useUserOrdersQuery();

	return (
		<View>
			<Text style={[textStyles.sectionHeader, { marginLeft: 16 }]}>
				Recent Orders
			</Text>
			<FlatList
				data={data?.orders}
				keyExtractor={({ id }) => id}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => {
					const nameText = item.order_items[0]?.item.name;
					return (
						<TouchableOpacity
							activeOpacity={0.8}
							key={item.id}
							style={{ marginLeft: 16 }}
						>
							<View style={styles.orderContainer}>
								<View style={styles.storeAvatar} />
								<View style={styles.orderInformation}>
									<Text style={{ fontSize: 16 }}>
										{nameText}
										{item.order_items.length > 1 &&
											` and ${item.order_items.length - 1} ${
												item.order_items.length - 1 > 1 ? 'others' : 'other'
											}`}
									</Text>
									<Text
										style={{
											fontSize: 14,
											fontWeight: '500',
											color: getStatusColor(item.status)
										}}
									>
										{item.status}
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					);
				}}
				ListFooterComponent={<View style={{ width: 16 }} />}
				ListEmptyComponent={
					<Text style={styles.emptyText}>
						No recent orders to view. Order some items to view them here
					</Text>
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	orderContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	storeAvatar: {
		height: 50,
		width: 50,
		borderRadius: 25,
		backgroundColor: '#D3D3D3'
	},
	orderInformation: {
		marginLeft: 10
	},
	emptyText: {
		color: '#C4C4C4',
		fontSize: 16,
		marginHorizontal: 20,
		marginVertical: 5
	}
});

export default RecentOrders;
