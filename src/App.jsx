import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';

const PRODUCTS = [
 {id:1,name:'Velvet Matte Lipstick',category:'Makeup',price:599,oldPrice:799,tag:'BESTSELLER',tone:'rose',emoji:'💄',desc:'A smooth, richly pigmented matte finish.'},
 {id:2,name:'Radiance Face Serum',category:'Skincare',price:899,oldPrice:1199,tag:'GLOW PICK',tone:'gold',emoji:'🧴',desc:'A lightweight daily serum for a fresh glow.'},
 {id:3,name:'Bloom Eau de Parfum',category:'Perfumes',price:1499,oldPrice:1899,tag:'NEW',tone:'lavender',emoji:'🌸',desc:'A soft floral fragrance for every occasion.'},
 {id:4,name:'Hydrating Face Cream',category:'Skincare',price:749,oldPrice:999,tag:'DAILY CARE',tone:'cream',emoji:'🫙',desc:'Comforting moisture for soft, supple skin.'},
 {id:5,name:'Glow Makeup Palette',category:'Makeup',price:999,oldPrice:1299,tag:'POPULAR',tone:'peach',emoji:'🎨',desc:'Everyday shades for effortless looks.'},
 {id:6,name:'Luxury Beauty Kit',category:'Beauty Care',price:1299,oldPrice:1699,tag:'GIFT SET',tone:'blue',emoji:'✨',desc:'Your beauty essentials in one lovely set.'},
 {id:7,name:'Silk Touch Lip Gloss',category:'Makeup',price:449,oldPrice:599,tag:'TRENDING',tone:'rose',emoji:'💋',desc:'A glossy finish with a comfortable feel.'},
 {id:8,name:'Calm & Clean Face Wash',category:'Skincare',price:499,oldPrice:649,tag:'GENTLE',tone:'gold',emoji:'🧼',desc:'A gentle cleanser for your daily routine.'}
];
const money = n => `₹${n.toLocaleString('en-IN')}`;
function read(key, fallback){try{return JSON.parse(localStorage.getItem(key)) ?? fallback}catch{return fallback}}
function Header({count}) {return <><div className="topline">A LITTLE BEAUTY, A LOT OF CONFIDENCE · FREE SHIPPING ABOVE ₹999</div><header className="header"><Link to="/" className="logo">ELORA<span> BEAUTY</span></Link><nav><NavLink to="/">Home</NavLink><NavLink to="/products">Shop</NavLink><NavLink to="/about">About</NavLink><NavLink to="/contact">Contact</NavLink></nav><div className="head-actions"><Link to="/login">Sign in</Link><Link className="cart-link" to="/cart">Bag ({count})</Link></div></header></>}
function Footer(){return <footer><div><Link className="logo footlogo" to="/">ELORA<span> BEAUTY</span></Link><p>Beauty that feels like you.</p></div><div className="footlinks"><Link to="/faq">FAQs</Link><Link to="/terms">Terms</Link><Link to="/privacy">Privacy</Link><Link to="/contact">Contact</Link></div><small>© 2026 ELORA Beauty. All rights reserved.</small></footer>}
function ProductCard({p,add}){return <article className="product-card"><Link to={`/product/${p.id}`} className={`product-art ${p.tone}`}><span className="product-tag">{p.tag}</span><span className="product-emoji">{p.emoji}</span><span className="art-label">ELORA</span></Link><div className="product-info"><div className="muted">{p.category}</div><Link to={`/product/${p.id}`} className="product-name">{p.name}</Link><div className="price-row"><b>{money(p.price)}</b><del>{money(p.oldPrice)}</del></div><button className="add-btn" onClick={()=>add(p)}>ADD TO BAG +</button></div></article>}
function Home({add}){return <><section className="hero"><div className="hero-copy"><p className="eyebrow">THE ELORA BEAUTY EDIT</p><h1>Feel beautiful.<br/><i>Be beautifully you.</i></h1><p>Thoughtfully picked beauty essentials to make every day feel a little more special.</p><Link className="button" to="/products">EXPLORE THE COLLECTION</Link></div><div className="hero-art"><div className="hero-circle"><span>✦</span><strong>YOUR<br/>BEAUTY<br/>RITUAL</strong><small>STARTS HERE</small></div><div className="floating f1">🌷</div><div className="floating f2">✨</div><div className="floating f3">💄</div></div></section><section className="section"><div className="section-heading"><div><p className="eyebrow">SHOP YOUR FAVOURITES</p><h2>Explore our collections</h2></div><Link to="/products" className="text-link">VIEW ALL PRODUCTS →</Link></div><div className="category-grid">{['Makeup','Skincare','Perfumes','Beauty Care'].map((c,i)=><Link key={c} to={`/category/${encodeURIComponent(c)}`} className={`category-card cat${i}`}><span>{['💄','🌿','🌸','✨'][i]}</span><b>{c}</b><small>EXPLORE →</small></Link>)}</div></section><section className="section bestsellers"><div className="section-heading"><div><p className="eyebrow">LOVED BY YOU</p><h2>Beauty bestsellers</h2></div><Link to="/products" className="text-link">SHOP ALL →</Link></div><div className="product-grid">{PRODUCTS.slice(0,4).map(p=><ProductCard key={p.id} p={p} add={add}/>)}</div></section><section className="quote-band"><p>“Beauty begins the moment you decide to be yourself.”</p><span>— THE ELORA PHILOSOPHY —</span></section></>}
function Products({add}){return <main className="page"><p className="eyebrow">THE BEAUTY SHELF</p><h1>All Products</h1><p className="page-intro">Find your next everyday favourite.</p><div className="product-grid">{PRODUCTS.map(p=><ProductCard key={p.id} p={p} add={add}/>)}</div></main>}
function Category({add}){const {name}=useParams();const title=decodeURIComponent(name);const items=PRODUCTS.filter(p=>p.category.toLowerCase()===title.toLowerCase());return <main className="page"><p className="eyebrow">EXPLORE ELORA</p><h1>{title}</h1><p className="page-intro">Our {title.toLowerCase()} favourites, picked for you.</p>{items.length?<div className="product-grid">{items.map(p=><ProductCard key={p.id} p={p} add={add}/>)}</div>:<p>No products found in this category.</p>}</main>}
function Detail({add}){const {id}=useParams();const p=PRODUCTS.find(x=>x.id===Number(id));if(!p)return <main className="page"><h1>Product not found</h1><Link to="/products">Back to shop</Link></main>;return <main className="detail page"><div className={`detail-art product-art ${p.tone}`}><span className="product-emoji">{p.emoji}</span><span className="art-label">ELORA</span></div><div><p className="eyebrow">{p.category}</p><h1>{p.name}</h1><p>{p.desc}</p><h2>{money(p.price)} <del className="old-price">{money(p.oldPrice)}</del></h2><p className="muted">Inclusive of all taxes.</p><button className="button" onClick={()=>add(p)}>ADD TO BAG</button><p className="muted">Easy returns · Secure checkout · Beauty made simple</p></div></main>}
function Cart({cart,setCart}){const items=Object.values(cart);const total=items.reduce((s,x)=>s+x.price*x.qty,0);const change=(id,qty)=>setCart(old=>({...old,[id]:{...old[id],qty}}));return <main className="page"><p className="eyebrow">YOUR ELORA EDIT</p><h1>Shopping Bag</h1>{!items.length?<div className="empty"><div>🛍️</div><h2>Your bag is waiting for beauty.</h2><Link className="button" to="/products">CONTINUE SHOPPING</Link></div>:<div className="cart-layout"><div>{items.map(x=><div className="cart-item" key={x.id}><div className={`mini-art ${x.tone}`}>{x.emoji}</div><div className="cart-desc"><b>{x.name}</b><span>{money(x.price)}</span><div className="qty"><button onClick={()=>change(x.id,Math.max(1,x.qty-1))}>−</button>{x.qty}<button onClick={()=>change(x.id,x.qty+1)}>+</button><button className="remove" onClick={()=>setCart(old=>{const n={...old};delete n[x.id];return n})}>Remove</button></div></div><b>{money(x.price*x.qty)}</b></div>)}</div><aside className="summary"><h3>Order Summary</h3><p>Subtotal <b>{money(total)}</b></p><p>Shipping <b>{total>=999?'FREE':'₹60'}</b></p><hr/><h3>Total <b>{money(total+(total>=999?0:60))}</b></h3><button className="button full" onClick={()=>alert('Thank you! Demo checkout is ready. Connect a payment gateway for real orders.')}>PROCEED TO CHECKOUT</button><small>Demo checkout · No payment will be collected</small></aside></div>}</main>}
function Auth({mode}){
 const nav=useNavigate();
 const [form,setForm]=useState({name:'',email:'',password:''});
 const [msg,setMsg]=useState(''); const [busy,setBusy]=useState(false);
 const update=e=>setForm({...form,[e.target.name]:e.target.value});
 const submit=async e=>{
  e.preventDefault(); setMsg(''); setBusy(true);
  try {
   const response=await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/${mode==='register'?'auth/register':mode==='login'?'auth/login':'auth/forgot-password'}`,{
    method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)
   });
   const data=await response.json();
   if(!response.ok) throw new Error(data.message || 'Something went wrong.');
   if(mode==='login'){localStorage.setItem('elora_token',data.token);localStorage.setItem('elora_user',JSON.stringify(data.user));nav('/');}
   else setMsg(data.message);
  } catch(err){setMsg(err.message==='Failed to fetch'?'Backend server is not running. Start it using the backend instructions.':err.message);}
  finally{setBusy(false);}
 };
 return <main className="auth-wrap"><form className="auth-card" onSubmit={submit}>
 <p className="eyebrow">WELCOME TO ELORA</p><h1>{mode==='login'?'Sign in':mode==='register'?'Create account':'Reset password'}</h1>
 <p className="muted">{mode==='login'?'Sign in to continue your beauty journey.':mode==='register'?'Join us and discover your beauty favourites.':'Enter your email to reset your password.'}</p>
 {mode==='register'&&<label>Full name<input name="name" value={form.name} onChange={update} required/></label>}
 <label>Email address<input type="email" name="email" value={form.email} onChange={update} required/></label>
 {mode!=='forgot'&&<label>Password<input type="password" name="password" value={form.password} onChange={update} minLength="6" required/></label>}
 {msg&&<p className="form-msg">{msg}</p>}
 <button className="button full" disabled={busy}>{busy?'PLEASE WAIT...':mode==='login'?'SIGN IN':mode==='register'?'CREATE ACCOUNT':'SEND RESET LINK'}</button>
 <div className="auth-links">{mode==='login'?<><Link to="/forgot-password">Forgot password?</Link><span>New here? <Link to="/register">Create account</Link></span></>:<span><Link to="/login">Back to sign in</Link></span>}</div>
 </form></main>
}
function StaticPage({type}){const content={about:['About ELORA','ELORA is a beauty and cosmetics destination created to make discovering your everyday essentials simple, joyful and inspiring. We believe beauty is personal, confidence is powerful, and every routine should feel like your own.'],contact:['Contact Us','We would love to hear from you. Email: hello@elorabeauty.example | Phone: +91 90000 00000 | Support hours: Monday–Saturday, 10 AM–6 PM.'],faq:['Frequently Asked Questions','How can I place an order? Browse products, add your favourites to the bag and proceed to checkout.\n\nDo you offer free shipping? Yes, on orders above ₹999.\n\nCan I return a product? Contact our support team for return assistance.\n\nIs online payment available? This demo website does not collect real payments.'],terms:['Terms & Conditions','This website is a demonstration e-commerce project. Product descriptions, prices and checkout are for demonstration only. Orders are not processed and no payment is collected. Please use the website responsibly.'],privacy:['Privacy Policy','This demo stores cart and account information locally in your browser using localStorage. No information is sent to a server. Do not enter real passwords or sensitive personal information. Clearing browser storage removes locally saved demo data.']};const [title,body]=content[type];return <main className="page prose"><p className="eyebrow">ELORA BEAUTY</p><h1>{title}</h1>{body.split('\n\n').map((p,i)=><p key={i}>{p}</p>)}</main>}
export default function App(){
 const [cart,setCart]=useState(()=>read('elora_cart',{}));
 useEffect(()=>{localStorage.setItem('elora_cart',JSON.stringify(cart))},[cart]);
 const count=useMemo(()=>Object.values(cart).reduce((s,x)=>s+x.qty,0),[cart]);
 const location=useLocation();
 const isAuthPage=['/login','/register','/forgot-password'].includes(location.pathname);
 const add=p=>{setCart(old=>({...old,[p.id]:{...p,qty:(old[p.id]?.qty||0)+1}}));alert(`${p.name} added to your bag!`)};
 return <>
  {!isAuthPage&&<Header count={count}/>}
  <Routes>
   <Route path="/" element={<Home add={add}/>}/>
   <Route path="/products" element={<Products add={add}/>}/>
   <Route path="/category/:name" element={<Category add={add}/>}/>
   <Route path="/product/:id" element={<Detail add={add}/>}/>
   <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}/>
   <Route path="/login" element={<Auth mode="login"/>}/>
   <Route path="/register" element={<Auth mode="register"/>}/>
   <Route path="/forgot-password" element={<Auth mode="forgot"/>}/>
   <Route path="/about" element={<StaticPage type="about"/>}/>
   <Route path="/contact" element={<StaticPage type="contact"/>}/>
   <Route path="/faq" element={<StaticPage type="faq"/>}/>
   <Route path="/terms" element={<StaticPage type="terms"/>}/>
   <Route path="/privacy" element={<StaticPage type="privacy"/>}/>
   <Route path="*" element={<main className="page"><h1>Page not found</h1><Link to="/">Go Home</Link></main>}/>
  </Routes>
  {!isAuthPage&&<Footer/>}
 </>
}
