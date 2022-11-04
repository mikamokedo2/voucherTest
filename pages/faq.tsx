import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Support from '../components/Faq';

const support = () => {
  return (
    <div>
       <Header/>
       <Support isShow={true}/>
       <Footer />
    </div>
 
  )
}

export default support
