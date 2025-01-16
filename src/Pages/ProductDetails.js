import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  //get products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-app-backend-qsdk.onrender.com/api/v1/product/get-product/${params.slug}`
      );
      console.log("data", data);
      setProduct(data?.product);
      getSimilarProducts(data?.product?._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line
  }, [params?.slug]);

  //similar product
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-app-backend-qsdk.onrender.com/api/v1/product/related-product/${pid}/${cid}`
      );
      console.log("similarproducts", data);
      setRelatedProducts(data?.products);
    } catch (error) {}
  };

  return (
    <>
      <Layout>
        <div className="row  conatiner mt-2">
          <div className="col-md-6 allproductdetals">
            <img
              src={`https://ecommerce-app-backend-qsdk.onrender.com/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="product-image"
              width="250"
            ></img>
          </div>
          <div className="col-md-6 allproductdetals ">
            <h1 className="text-center product-details">products details</h1>
            <h6 className="producydatails">Name : {product.name}</h6>
            <h6 className="producydatails">
              description : {product.description}
            </h6>
            <h6 className="producydatails">price :{product.price} Rs</h6>
            <h6 className="producydatails">
              category : {product.category?.name}
            </h6>
            <div>
              {" "}
              <button
                className="productbtn"
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  toast.success("item added sucessfully");
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <h6 className="similarproduct">similar products</h6>
          {relatedProducts.length < 1 && (
            <p className="text-center">No similar products found</p>
          )}
          <div className="d-flex flex-wrap  ">
            {relatedProducts?.map((p) => (
              <>
                <div className="allsimliarproduct"></div>

                <Card style={{ width: "18rem" }} className="card m-2">
                  <Card.Img
                    variant="top"
                    src={`https://ecommerce-app-backend-qsdk.onrender.com/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="similarig"
                  />
                  <hr></hr>
                  <Card.Body>
                    <Card.Title className="similarproducttext">
                      Name : {p.name}
                    </Card.Title>
                    <Card.Text className="similarproducttext">
                      description : {p.description.substring(1, 20)}
                    </Card.Text>
                    <Card.Text className="similarproducttext">
                      price : ${p.price}
                    </Card.Text>
                    <Button
                      variant="primary ms-1 "
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More detail
                    </Button>
                    <Button
                      variant="secondary ms-1 "
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("item added sucessfully");
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductDetails;
