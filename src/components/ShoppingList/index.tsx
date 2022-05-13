import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const subscribe = firestore()
    .collection('products')
    .orderBy('description')
    // .startAfter(2)
    // .endBefore(5)
    // .startAt(2)
    // .endAt(4)
    // .orderBy('description', 'desc')
    // .where('quantity', '==', 1) Filtra
    // .limit(3) Limita quantos vem
    .onSnapshot(querySnapshot => {
      const data = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as ProductProps[];

      setProducts(data);
    });
    
    return () => subscribe();
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
