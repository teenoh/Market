import React from 'react';
import {
	FlatList,
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStoreItemsQuery } from '../../types/api';

interface StoreItemsProps {
	storeId: string;
	header: React.FC;
}

const StoreItems: React.FC<StoreItemsProps> = ({ storeId, header }) => {
	const [{ data }] = useStoreItemsQuery({
		variables: { storeId }
	});
	const { navigate } = useNavigation();
	const storeItems = data?.items.filter(item => item.store_id === storeId);

	if (!storeItems) throw new Error('No store items');

	return (
		<FlatList
			data={storeItems}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={header}
			showsVerticalScrollIndicator={false}
			renderItem={({ item }) => (
				<View style={{ flex: 1 }}>
					<TouchableOpacity
						key={item.id}
						style={{ flex: 1, margin: 10 }}
						onPress={() => navigate('Item', { itemId: item.id })}
						activeOpacity={0.8}
					>
						<View style={styles.itemImage} />
						<Text style={styles.itemName}>{item.name}</Text>
						<Text style={{ color: '#505050', fontSize: 15 }}>
							${item.unit_price}
						</Text>
					</TouchableOpacity>
				</View>
			)}
			numColumns={2}
		/>
	);
};

const styles = StyleSheet.create({
	itemName: {
		fontSize: 16,
		marginBottom: 2,
		fontWeight: '500'
	},
	itemImage: {
		borderRadius: 6,
		backgroundColor: '#D3D3D3',
		height: 200,
		width: '100%',
		marginBottom: 5
	}
});

export default StoreItems;
