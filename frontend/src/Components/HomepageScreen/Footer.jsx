import React from 'react'

function Footer() {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <> 
        <div class="wave-container wave">
            <p>© {year}, Developed & Designed with ❤️ by <a className='footer_faizan' target='_faizan' href='https://github.com/ad290'>Aditya Pawar</a></p>
        </div>
    </>
  )
}

export default Footer