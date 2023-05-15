import React from "react";
import { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";

import * as Yup from "yup";

const Forms = () => {
  let [pizza, setPizza] = useState({
    name: "",
    size: null,
    hamur: "",
    nPepperoni: false,
    nDomates: false,
    nBiber: false,
    nSosis: false,
    nMisir: false,
    nSucuk: false,
    nKanadaJambonu: false,
    nSucuk2: false,
    nAnanas: false,
    nTavukIzgara: false,
    nJalepeno: false,
    nKabak: false,
    nSogan: false,
    nSarimsak: false,
    note: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    size: null,
    hamur: "",
    nPepperoni: false,
    nDomates: false,
    nBiber: false,
    nSosis: false,
    nMisir: false,
    nSucuk: false,
    nKanadaJambonu: false,
    nSucuk2: false,
    nAnanas: false,
    nTavukIzgara: false,
    nJalepeno: false,
    nKabak: false,
    nSogan: false,
    nSarimsak: false,
    note: "",
  });

  const formSchema = Yup.object().shape({
    name: Yup.string().min(2, "Kullanıcı adı en az 2 karakterden oluşmalıdır."),
    size: Yup.string().required("Lütfen Pizzanızın boyutunu seçiniz!"),
    hamur: Yup.string().required("Lütfen Hamur kalınlığı tercihinizi seçiniz!"),
    note: Yup.string(),
    nPepperoni: Yup.string(),
    nDomates: Yup.string(),
    nBiber: Yup.string(),
    nSosis: Yup.string(),
    nMisir: Yup.string(),
    nSucuk: Yup.string(),
    nKanadaJambonu: Yup.string(),
    nSucuk2: Yup.string(),
    nAnanas: Yup.string(),
    nTavukIzgara: Yup.string(),
    nJalepeno: Yup.string(),
    nKabak: Yup.string(),
    nSogan: Yup.string(),
    nSarimsak: Yup.string(),
  });
  // Buradaki dataları Array içinde tutalım.
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setPizza({ ...pizza, [name]: value });
    Yup.reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
  };

  const inputCheckboxHandler = (e) => {
    const { name, checked } = e.target;
    setPizza({ ...pizza, [name]: checked });
  };

  useEffect(() => {
    console.log("pizza:", pizza);
  }, [pizza]);

  useEffect(() => {
    console.warn(formErrors);
  }, [formErrors]);

  const sender = useHistory();

  let [holdData, setHoldData] = useState([]);
  let [response, setResponse] = useState();

  return (
    <div>
      <Form
        id="pizza-form"
        onSubmit={(event) => {
          event.preventDefault();
          formSchema.isValid(pizza).then((valid) => {
            if (valid) {
              axios
                .post("https://reqres.in/api/users", { ...pizza })
                .then((res) => {
                  console.log("Yeni Pizza:", res.data);
                  setResponse(res.data);
                  setHoldData([...holdData, pizza]);
                  sender.push("validation");
                });
            } else {
              alert(
                "Hata! Siparişiniz tarafımıza ulaşmadı. Lütfen siparişinizi kontrol edip tekrar deneyiniz."
              );
            }
          });
        }}
      >
        <FormGroup>
          <Label htmlFor="isim">Müşteri Adı </Label>
          <Input
            id="isim"
            name="name"
            type="textbox"
            placeholder="Size nasıl hitap edelim?"
            onChange={inputChangeHandler}
            invalid={!!formErrors.name}
          />
          {formErrors.name && <FormFeedback>{formErrors.name}</FormFeedback>}
        </FormGroup>
        <br />
        <hr />
        <FormGroup>
          <legend>Boyut Seç *:</legend>
          <br />

          <Input
            type="radio"
            id="kucuk"
            name="size"
            value={"Kucuk"}
            onChange={inputChangeHandler}
            invalid={!!formErrors.size}
          />
          <label htmlFor="kucuk">Küçük</label>
          <br />

          <Input
            type="radio"
            id="orta"
            name="size"
            value={"Orta"}
            onChange={inputChangeHandler}
            invalid={!!formErrors.size}
          />
          <label htmlFor="orta">Orta</label>
          <br />

          <Input
            type="radio"
            id="buyuk"
            name="size"
            value={"Buyuk"}
            onChange={inputChangeHandler}
            invalid={!!formErrors.size}
          />
          <label htmlFor="buyuk">Büyük</label>
          <br />
          {formErrors.size && <FormFeedback>{formErrors.size}</FormFeedback>}
        </FormGroup>
        <br />
        <FormGroup>
          <Label htmlFor="size-dropdown">Hamur Seç *: </Label>
          <select id="size-dropdown" onChange={inputChangeHandler} name="hamur">
            <option selected disabled hidden>
              Hamur Kalınlığı
            </option>
            <option>İnce</option>
            <option>Orta</option>
            <option>Kalın</option>
          </select>
        </FormGroup>
        <br />
        <hr />
        <FormGroup>
          <Label htmlFor="user-service">Ek Malzemeler </Label>
          <br />
          <legend>En Fazla 10 malzeme seçebilirsiniz. 5₺</legend>
          <br />
          <Label htmlFor="for-pepperoni">Pepperoni </Label>
          <Input
            id="for-pepperoni"
            name="nPepperoni"
            type="checkbox"
            onChange={inputCheckboxHandler}
          />

          <Label htmlFor="for-domates">Domates </Label>
          <Input
            id="for-domates"
            name="nDomates"
            type="checkbox"
            onChange={inputCheckboxHandler}
          />

          <Label htmlFor="for-biber">Biber </Label>
          <Input
            id="for-biber"
            name="nBiber"
            type="checkbox"
            onChange={inputCheckboxHandler}
          />
          <br />
          <Label htmlFor="for-sosis">Sosis </Label>
          <Input
            id="for-sosis"
            name="nSosis"
            type="checkbox"
            onChange={inputCheckboxHandler}
          />

          <Label htmlFor="for-misir">Mısır </Label>
          <Input
            id="for-misir"
            name="nMisir"
            type="checkbox"
            onChange={inputCheckboxHandler}
          />

          <Label htmlFor="for-sucuk">Sucuk </Label>
          <Input
            id="for-sucuk"
            name="nSucuk"
            type="checkbox"
            onChange={inputCheckboxHandler}
          />

          <br />
          <Label htmlFor="for-jambon">Kanada Jambonu </Label>
          <Input
            id="for-jambon"
            name="nKanadaJambonu"
            type="checkbox"
            onChange={inputCheckboxHandler}
          />

          <Label htmlFor="for-sucuk2">Sucuk </Label>
          <Input
            id="for-sucuk2"
            name="nSucuk2"
            type="checkbox"
            onChange={inputCheckboxHandler}
          />

          <Label htmlFor="for-Ananas">Ananas </Label>
          <Input
            id="for-Ananas"
            name="nAnanas"
            type="checkbox"
            onChange={inputCheckboxHandler}
          />

          <br />
          <Label htmlFor="for-tavuk">Tavuk Izgara </Label>
          <Input
            id="for-tavuk"
            name="nTavukIzgara"
            type="checkbox"
            onChange={inputCheckboxHandler}
          />

          <Label htmlFor="for-jalepeno">Jalepeno </Label>
          <Input
            id="for-jalepeno"
            name="nJalepeno"
            type="checkbox"
            onChange={inputCheckboxHandler}
          />

          <Label htmlFor="for-kabak">Kabak </Label>
          <Input
            id="for-kabak"
            name="nKabak"
            type="checkbox"
            onChange={inputCheckboxHandler}
          />

          <br />
          <Label htmlFor="for-sogan">Soğan </Label>
          <Input
            id="for-sogan"
            name="nSogan"
            type="checkbox"
            onChange={inputCheckboxHandler}
          />

          <Label htmlFor="for-sarimsak">Sarımsak </Label>
          <Input
            id="for-sarimsak"
            name="nSarimsak"
            type="checkbox"
            onChange={inputCheckboxHandler}
          />
        </FormGroup>
        <br />
        <hr />
        <FormGroup>
          <Label htmlFor="special-text">Sipariş Notu: </Label>
          <Input
            id="special-text"
            name="note"
            type="textbox"
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            style={{ width: "300px" }}
            onChange={inputChangeHandler}
          />
        </FormGroup>
        <br />
        <Button id="order-button" type="submit">
          Sipariş Ver
        </Button>{" "}
      </Form>
    </div>
  );
};

export default Forms;
