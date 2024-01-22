const apiUrl =
  "https://crudcrud.com/api/e458657000564448b445f26a89fe5b20/candyShop";

let form = document.getElementById("form");

async function handleSubmit(event) {
  event.preventDefault();

  let candyName = document.getElementById("name").value;
  let candyPrice = document.getElementById("price").value;
  let candyDescription = document.getElementById("description").value;
  let candyQuantity = document.getElementById("quantity").value;

  let candy = {
    name: candyName,
    description: candyDescription,
    price: candyPrice,
    quantity: candyQuantity,
  };

  try{
   let response= await axios.post(apiUrl, candy)
      checkResponse(response);
      console.log("CANDY ADDED!");
    }
    catch(error){
    console.log(error)
    }

  form.reset();
}
// ----------------------------------------------------------------------------------
//checking response wether it is object or array of objects

function checkResponse(response) {
  if (response && response.data) {
    if (Array.isArray(response.data)) {
      response.data.forEach((candyData) => {
        displayOutput(candyData);
      });
    } else if (typeof response.data === "object") {
      displayOutput(response.data);
    }
  }
}

// --------------------------------------------------------------------------------
//function to showoutput on the screen

function displayOutput(candyData) {
  let nameList = document.getElementById("nameList");
  let priceList = document.getElementById("priceList");
  let descriptionList = document.getElementById("descriptionList");
  let quantityList = document.getElementById("quantityList");
  let buyList = document.getElementById("buyList");

  const { _id, name, price, description, quantity } = candyData;

  nameList.innerHTML += `<li>${name}</li>`;
  descriptionList.innerHTML += `<li>${description}</li>`;
  priceList.innerHTML += `<li>${price}</li>`;

  quantityList.innerHTML += ` <li>
     <span class="qty-chng">${quantity}</span>
            <button class="qty1" onclick="buttonOne(event, '${_id}', '${quantity}', '${name}', '${price}', '${description}')">buy-one</button>
            <button class="qty2" onclick="buttonTwo(event, '${_id}', '${quantity}', '${name}', '${price}', '${description}')">buy-two</button>
            <button class="qty3" onclick="buttonThree(event, '${_id}', '${quantity}', '${name}', '${price}', '${description}')">buy-three</button>
  </li>`;
}
// -------------------------------------------------------------------------------------
// function to display data after page get refreshed

window.addEventListener("DOMContentLoaded", async() => {
    try{
 const response = await axios.get(apiUrl)
      checkResponse(response);
      console.log("PAGE REFRESHED!");
    }
    catch(error){
         console.log(error)
    }
})

// ---------------------------------------------------------------------------------------------
// event handler for button-buy-one

let currentQuantity;

async function buttonOne(event, _id, quantity, name, price, description) {
  let updated_Name = name;
  let updated_price = price;
  let updated_description = description;

  if (currentQuantity === undefined) {
    currentQuantity = parseInt(quantity);
  }

  let updated_Qty = Math.max(0, currentQuantity - 1);

  let targetQty = event.target.parentElement;
  let x = targetQty.children[0];
  x.textContent = updated_Qty;
  currentQuantity = updated_Qty;

  //others button gets disabled

  let otherButtons = event.target.parentElement.querySelectorAll(".qty2, .qty3");
  otherButtons.forEach((button) => {
    button.disabled = true;
  });

  try {
    axios.put(`${apiUrl}/${_id}`, {
      name: updated_Name,
      description: updated_description,
      price: updated_price,
      quantity: updated_Qty,
    });
    console.log("Quantity updated");
  } catch (error) {
    console.error("Error updating quantity");
  }
}

// event handler for button-buy-two

async function buttonTwo(event, _id, quantity, name, price, description) {
  let updated_name = name;
  let updated_price = price;
  let updated_description = description;

  if (currentQuantity === undefined) {
    currentQuantity = parseInt(quantity);
  }

  let updated_Qty = Math.max(0, currentQuantity - 2);

  let targetQty = event.target.parentElement;

  let x = targetQty.children[0];

  x.textContent = updated_Qty;

  currentQuantity = updated_Qty;

  //others button gets disabled

  let otherButtons =
    event.target.parentElement.querySelectorAll(".qty1, .qty3");
  otherButtons.forEach((button) => {
    button.disabled = true;
  });

  try {
    await axios.put(`${apiUrl}/${_id}`, {
      name: updated_name,
      description: updated_description,
      price: updated_price,
      quantity: updated_Qty,
    });
    console.log("Quantity Updated");
  } catch (error) {
    console.error("Error updating quantity");
  }
}

// event handler for button-buy-three

async function buttonThree(event, _id, quantity, name, price, description) {
  let updated_name = name;
  let updated_price = price;
  let updated_description = description;

  if (currentQuantity === undefined) {
    currentQuantity = parseInt(quantity);
  }

  let updated_Qty = Math.max(0, currentQuantity - 3);

  let targetQty = event.target.parentElement;

  let x = targetQty.children[0];

  x.textContent = updated_Qty;

  currentQuantity = updated_Qty;

//others button gets disabled

let otherButtons = event.target.parentElement.querySelectorAll(".qty1, .qty2");
otherButtons.forEach((button) => {
  button.disabled = true;
});

try{
 await axios
    .put(`${apiUrl}/${_id}`, {
      name: updated_name,
      description: updated_description,
      price: updated_price,
      quantity: updated_Qty,
    })
      console.log("Quantity updated");
}
    catch(error){
      console.error("Error updating quantity");
    };
}
