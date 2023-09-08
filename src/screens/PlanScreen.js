import React, { useEffect, useState } from 'react'
import "./PlanScreen.css"
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlanScreen() {
  const [products,setProducts]=useState([]);
 const user=useSelector(selectUser);
 const [subscription,setSubsription]=useState(null);

 useEffect(()=>{
  db.collection('customers')
  .doc(user.uid)
  .collection("subscriptions")
  .get()
  .then(querySnapshot=>{
    querySnapshot.forEach(async subscription=>{
      setSubsription({
        role:subscription.data().role,
        current_period_end:subscription.data().current_period_end.seconds,
        current_period_start:subscription.data().current_period_start.seconds,
      })
    })
  })
 },[user.uid])
  useEffect(()=>{
 db.collection("products")
 .where("active","==",true)
 .get()
 .then((querySnapshot)=>{
  const products={};
    querySnapshot.forEach(async productDoc=>{
    products[productDoc.id]=productDoc.data();
    const priceSnap= await productDoc.ref.collection("prices").get();
    // for more then one price
    priceSnap.docs.forEach(price=>{
      products[productDoc.id].prices={
        priceId:price.id,
        priceData:price.data()
      }
    })
  });
  setProducts(products);
 });
  },[]);
  const loadCheckout=async(priceId)=>{
   const docRef=await db.collection("customers")
                .doc(user.uid)
                .collection("checkout_sessions")
                .add({
                  price:priceId,
                  success_url:window.location.origin,
                  cancel_url:window.location.origin,
                });
           docRef.onSnapshot(async(snap)=>{
            const {error,sessionId}=snap.data();
            if(error){
              alert(`An error occured:${error.message}`);
            }
            if(sessionId){
              //We have a session , Lets redirect to Checkout
              //Init Stripe

              const stripe=await loadStripe("pk_test_51NM9z2SAlbwMNW0BP0y4jt4nP5sMOrOWIxoHqLHs5XXFAuWXvYUa9AG8QN5hd4x9Eqpo7WNTmLnalsP6YGUVQ1qB00T6AK6q5U")
              stripe.redirectToCheckout({sessionId});

            }
       });  
  };
  return (
    <div className='plansScreen'>
      <br />
      {subscription && (
        <p>Renewal date: {new Date(subscription?.current_period_end*1000).toLocaleDateString()}</p>
      )}
      {/* it is an object so you cant just simply map down like array you have to do the following  */}
      {Object.entries(products).map(([productId,productData])=>{
        //Adding logic to check user subscription is active or not....
        const isCurrentPackage=productData.name?.toLowerCase().includes(subscription?.role);
        console.log(isCurrentPackage);
        return (
         <div key={productId} className={`${isCurrentPackage && "planScreen_plans--disabled"} planScreen_plans`}>
          <div className="planScreen_info">
            <h5>{productData.name}</h5>
            <h6>{productData.description}</h6>
          </div>
          <button onClick={()=> !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
          {isCurrentPackage?'Current Package' :'Subsribe'}
          </button>
         </div>
        );
      })}
    </div>
  )
}

export default PlanScreen
