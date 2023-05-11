import React from "react";
import { useState, useEffect } from "react";
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
  let [orderList, setOrderList] = useState([]);
  let [agree, setAgree] = useState(false);
  let [pizza, setPizza] = useState({
    name: "",
    size: "",
    hamur: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    size: "",
    hamur: "",
  });

  const formSchema = Yup.object().shape({
    name: Yup.string().min(2, "Kullanıcı adı en az 2 karakterden oluşmalıdır."),
    size: Yup.string().required("Bir Pizza boyu seçmeniz gerek!"),
    hamur: Yup.string().required("Hamur seçimi yapmanız gerek!"),
  });

  const checkboxHandler = () => {
    setAgree(!agree);
  };

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

  useEffect(() => {
    formSchema.isValid(pizza).then((valid) => {
      if (valid) console.warn("Ok!");
      else console.warn("Hatalı Form!");
    });
  });

  useEffect(() => {
    console.warn(formErrors);
  }, [formErrors]);

  let [holdData, setHoldData] = useState([]);
  let [response, setResponse] = useState();

  return (
    <div>
      <Form
        id="pizza-form"
        onSubmit={(event) => {
          event.preventDefault();
          setOrderList([...orderList, pizza]);

          console.log(orderList);

          axios
            .post("https://reqres.in/api/users", { ...pizza })
            .then((res) => {
              console.log("Yeni kullanıcı:", res.data);
              setResponse(res.data);
            });

          setHoldData([...holdData, pizza]);
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
          <Label htmlFor="user-name">Boyut Seç *: </Label>
          <br />

          <Input
            type="radio"
            id="kucuk"
            name="secim"
            value="kucuk"
            checked={true}
          />
          <label htmlFor="kucuk">Küçük</label>
          <br />

          <Input
            type="radio"
            id="orta"
            name="secim"
            value="orta"
            checked={true}
          />
          <label htmlFor="orta">Orta</label>
          <br />

          <Input
            type="radio"
            id="buyuk"
            name="secim"
            value="buyuk"
            checked={true}
          />
          <label htmlFor="buyuk">Büyük</label>
          <br />
          {formErrors.size && <FormFeedback>{formErrors.size}</FormFeedback>}
        </FormGroup>
        <br />
        <FormGroup>
          <Label htmlFor="size-dropdown">Hamur Seç *: </Label>
          <select
            id="size-dropdown"
            onChange={inputChangeHandler}
            invalid={!!formErrors.name}
            name="hamur"
          >
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
          <Input id="for-pepperoni" name="nPepperoni" type="checkbox" />
          <Label htmlFor="for-domates">Domates </Label>
          <Input id="for-domates" name="nDomates" type="checkbox" />
          <Label htmlFor="for-biber">Biber </Label>
          <Input id="for-biber" name="nBiber" type="checkbox" />
          <br />
          <Label htmlFor="for-sosis">Sosis </Label>
          <Input id="for-sosis" name="nSosis" type="checkbox" />
          <Label htmlFor="for-misir">Mısır </Label>
          <Input id="for-misir" name="nMisir" type="checkbox" />
          <Label htmlFor="for-sucuk">Sucuk </Label>
          <Input id="for-sucuk" name="nSucuk" type="checkbox" />
          <br />
          <Label htmlFor="for-jambon">Kanada Jambonu </Label>
          <Input id="for-jambon" name="nKanadaJambonu" type="checkbox" />
          <Label htmlFor="for-sucuk2">Sucuk </Label>
          <Input id="for-sucuk2" name="nSucuk2" type="checkbox" />
          <Label htmlFor="for-Ananas">Ananas </Label>
          <Input id="for-Ananas" name="nAnanas" type="checkbox" />
          <br />
          <Label htmlFor="for-tavuk">Tavuk Izgara </Label>
          <Input id="for-tavuk" name="nTavuk Izgara" type="checkbox" />
          <Label htmlFor="for-jalepeno">Jalepeno </Label>
          <Input id="for-jalepeno" name="nJalepeno" type="checkbox" />
          <Label htmlFor="for-kabak">Kabak </Label>
          <Input id="for-kabak" name="nKabak" type="checkbox" />
          <br />
          <Label htmlFor="for-sogan">Soğan </Label>
          <Input id="for-sogan" name="nSoğan" type="checkbox" />
          <Label htmlFor="for-sarimsak">Sarımsak </Label>
          <Input id="for-sarimsak" name="nSarimsak" type="checkbox" />
        </FormGroup>
        <br />
        <hr />
        <FormGroup>
          <Label htmlFor="special-text">Sipariş Notu: </Label>
          <Input
            id="special-text"
            type="textbox"
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            style={{ width: "300px" }}
          />
        </FormGroup>
        <br />
        <Button id="order-button">Sipariş Ver</Button>
      </Form>
    </div>
  );
};

export default Forms;
