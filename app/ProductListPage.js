import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../slices/cartSlice";

export default function ProductList() {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVissible, setModalVisible] = useState(false);

  const closeModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };
  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecrement = (product) => {
    if (product.quantity == 1) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(decrementQuantity(product));
    }
  };
  incrementQuantity;
  const handleincrement = (product) => {
    dispatch(incrementQuantity(product));
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .then((error) => console.log("error fetching products:", error));
  }, []);

  const findQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const ProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => openModal(item)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productRating}>⭐⭐⭐⭐ </Text>
        <Text style={styles.productPrice}>Rs.{item.price}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Products</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={products}
          renderItem={ProductItem}
          keyExtractor={(item) => item.id.toString()}
        />
        {selectedProduct && (
          <Modal
            visible={modalVissible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image
                  source={{ uri: selectedProduct.image }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalName}>{selectedProduct.title}</Text>
                <Text style={styles.modalDescription}>
                  {selectedProduct.description}
                </Text>
                <Text></Text>
                <Text style={styles.modaltPrice}>
                  Rs.{selectedProduct.price}
                </Text>
                {cart.some((value) => value.id == selectedProduct.id) ? (
                  <View style={styles.cartManageContainer}>
                    <TouchableOpacity
                      style={styles.decrementtButton}
                      onPress={() => handleDecrement(selectedProduct)}
                    >
                      <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.quantityContainer}>
                      <Text style={styles.quantityText}>
                        Qty: {findQuantity(selectedProduct.id)}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.incrementtButton}
                      onPress={() => handleincrement(selectedProduct)}
                    >
                      <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => handleAddToCart(selectedProduct)}
                  >
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: "#06F7FF",
    marginBottom: 10,
    width: "100%",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  productImage: {
    width: 90,
    height: 90,
    marginRight: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginRight: 90,
  },
  productRating: {
    fontSize: 12,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productCategory: {
    fontSize: 12,
    color: "#888",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 8,
  },
  modalImage: {
    width: "80%",
    height: 200,
    marginBottom: 15,
  },
  modalDetails: {
    padding: 10,
  },
  modalName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#888",
    marginBottom: 10,
  },
  modaltPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#888",
    alignSelf: "flex-start",
  },
  closeButton: {
    padding: 12,
    backgroundColor: "#CCD1D1",
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addToCartButton: {
    padding: 12,
    alignItems: "center",
    backgroundColor: "#FF0606",
    borderRadius: 10,
    width: "100%",
    marginTop: 10,
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  cartManageContainer: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  incrementtButton: {
    padding: 12,
    backgroundColor: "#4FEA2D",
    width: "25%",
    borderRadius: 10,
    marginTop: 10,
  },
  decrementtButton: {
    padding: 12,
    backgroundColor: "#FF0606",
    width: "25%",
    borderRadius: 10,
    marginTop: 10,
  },
  quantityContainer: {
    padding: 12,
    backgroundColor: "#F4F6F6",
    width: "30%",
    borderRadius: 10,
    marginTop: 10,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
});