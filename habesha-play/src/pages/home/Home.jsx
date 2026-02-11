import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/footer/Footer'
import Banner from '../../components/banner/banner'
import RowList from '../../components/Rows/RowList/RowList'

function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <RowList />
      <Footer />
    </div>
  )
}

export default Home