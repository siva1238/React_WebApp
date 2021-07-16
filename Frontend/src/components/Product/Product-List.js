import { useEffect, useState } from "react";
import ProductInfo from "./ProductInfo";
import { useHistory } from "react-router";
import ProductDialog from "./ProductModal";
import classes from "../../CSS/User.module.css";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [model, setmodel] = useState(false);
  const [modelData, setmodelData] = useState("");
  let history = useHistory();
  useEffect(() => {
    fetch("http://localhost:8080/admin/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Fetching products failed!");
        }
        return res.json();
      })
      .then((resData) => {
        setProduct(resData.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const openModelHandler = (data) => {
    setmodelData(data);
    setmodel(true);
  };

  return (
    <>
      <button
        className={classes.addButton}
        onClick={() => {
          history.replace("/product");
        }}
      >
        Add Product
      </button>
      <div className="row col-12 mt-5">
        {Object.values(product).map((value, key) => (
          <ProductInfo
            key={key}
            data={value}
            setModelData={(data) => {
              openModelHandler(data);
            }}
          />
        ))}
        {model && (
          <ProductDialog
            modelData={modelData}
            closeModelHandler={() => {
              setmodel(false);
            }}
          />
        )}
      </div>
    </>
  );
};
export default Products;
