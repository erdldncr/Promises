"use strict";

const patisserie = {
  bananaCaramel: {
    stock: 3,
    price: 9.99,
  },
  contessa: {
    stock: 5,
    price: 7.99,
  },
  concorde: {
    stock: 11,
    price: 22.99,
  },
  mouseCake: {
    stock: 8,
    price: 16.99,
  },
  confettiSuprise: {
    stock: 9,
    price: 14.99,
  },
};

let cakeAmount=document.getElementById('cakeAmount')
let btn=document.getElementById('submit_btn')
///selected option is the value of select elements
let select=document.querySelector('select')


btn.addEventListener('click',async ()=>{
  try{
    const order=await checkOrder(select.value)
    const paymentConformation=await payment(order)
    const stockControlConformation=await stockControl(paymentConformation)
  }
  catch(reject){
    console.log(reject)
  }

})



  const checkOrder = (order) => {

    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(Number(cakeAmount.value)<=patisserie[order].stock){ 
          let total=Number(cakeAmount.value)*patisserie[order].price
          console.log(`You ordered ${cakeAmount.value} ${order}`)
          patisserie[order].stock= patisserie[order].stock- Number(cakeAmount.value);
          resolve([total,patisserie[order].stock,Number(cakeAmount.value)] )
         
        }else{
          reject('Your order couldn\'t be completed becuse some items are sold out')
        }
      },1000)
     
    })
  }
  


  
    






const payment = (resolvedValueArray) => {
  return new Promise((resolve,reject)=>{
    console.log(`All of the items are in stock. Total cost of order is ${resolvedValueArray[0]}.Press '1' to continue`)
    setTimeout(()=>{
      document.addEventListener('keydown',(e)=>{
        if(e.key=='1'){
          
          console.log(`Payment is completed you paid ${resolvedValueArray[0]}`)
          console.log(resolvedValueArray[1])
          document.removeEventListener('keydown',(e)=>{})
          resolve(resolvedValueArray)
        }
      })

    },1000)
  })

  
  
}

const stockControl = (resolvedValueArray) => {
  return new Promise((resolve,reject)=>{
    console.log('To cashier wait for checking stock...')
    setTimeout(()=>{
      if(resolvedValueArray[1]>0){
        resolve(`${select.value} stock is ${resolvedValueArray[1]}`)
      }else{
        reject(`Warning , stock is run out`)
      }
    },1000)
     

  })

  }



