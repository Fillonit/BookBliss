const AboutUs = () => {
	return (

		// about us 
		<section>
  <div className="px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
    <div className="grid items-center grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
      <div className="md:order-first">
        <h1 className="text-4xl font-semibold tracking-tighter text-gray-900 text-balance">
          Welcome to BookBliss,
          <span className="text-gray-600">your gateway to literary adventures</span>
        </h1>

        <dl className="grid grid-cols-2 gap-4 mt-12 list-none lg:gap-6 text-pretty">
          <div>
            <div>❖</div>
            <dt className="mt-4 font-medium text-gray-900">
              Curated Collections
            </dt>
            <dd className="mt-2 text-sm text-gray-500">
              At BookBliss, we handpick books from various genres to inspire and entertain you. Our curated collections ensure there's something for every reader.
            </dd>
          </div>
          <div>
            <div>❖</div>
            <dt className="mt-4 font-medium text-gray-900">
              Exclusive Offers
            </dt>
            <dd className="mt-2 text-sm text-gray-500">
              Enjoy special discounts and promotions available only to our subscribers. We believe in making great books accessible to everyone.
            </dd>
          </div>
          <div>
            <div>❖</div>
            <dt className="mt-4 font-medium text-gray-900">Community Events</dt>
            <dd className="mt-2 text-sm text-gray-500">
              Join our vibrant community through book clubs and virtual events. Connect with fellow readers and authors, and share your love for books.
            </dd>
          </div>
          <div>
            <div>❖</div>
            <dt className="mt-4 font-medium text-gray-900">
              Personalized Recommendations
            </dt>
            <dd className="mt-2 text-sm text-gray-500">
              Our platform provides book suggestions tailored to your tastes and preferences. Discover new favorites with our personalized recommendations.
            </dd>
          </div>
        </dl>
      </div>
      <div className="order-first block w-full mt-12 aspect-square lg:mt-0">
        <div className="h-full p-2 overflow-hidden border shadow-lg bg-gray-50 rounded-3xl">
          <img alt="BookBliss App" className="relative w-full rounded-2xl drop-shadow-2xl" src="https://i.pinimg.com/564x/5e/da/18/5eda18ec4297253777269507c4117426.jpg"/>
        </div>
      </div>
    </div>
  </div>


	  
	
		
	{/* anout us  */}



	{/* second section */}
	<section className="text-gray-600 body-font">
  <div className="container px-5 mx-auto">
    <div className="flex flex-col text-center w-full mb-20 ">
    </div>
    <div className="flex justify-center text-center">
      <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
        <div className="border-2 border-gray-200 px-4 py-7 rounded-lg">
         <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="text-amber-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
            <path d="M8 17l4 4 4-4m-4-5v9"></path>
            <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
          </svg>
          <h2 className="title-font font-medium sm:text-2xl text-3xl text-gray-900">2.7K</h2>
          <p className="leading-relaxed sm:text-sm">Books</p>
        </div>
      </div>
      <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="text-amber-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
          </svg>
          <h2 className="title-font font-medium text-3xl text-gray-900">1.3K</h2>
          <p className="leading-relaxed">Users</p>
        </div>
      </div>
      <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
        <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="text-amber-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
            <path d="M3 18v-6a9 9 0 0118 0v6"></path>
            <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
          </svg>
          <h2 className="title-font font-medium text-3xl text-gray-900">74</h2>
          <p className="leading-relaxed">Authors</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* second section  */}

<section>
  <div className="px-8 py-12 mx-auto md:px-12 lg:px-32 max-w-7xl">
    <div className="p-2 border bg-gray-50 rounded-3xl">
      <div className="p-10 text-center bg-white border shadow-lg md:p-20 rounded-3xl">
       
        <p className="mt-8 text-4xl font-semibold tracking-tighter text-black">
		Want to get notified when new books come out?
        </p>
        <p className="mx-auto mt-4 text-base font-medium text-gray-500 text-balance">
		Subscribe to our newsletter and be the first to know about the latest arrivals and exclusive offers. Enter your email below to stay updated!
        </p>

        <form className="w-full max-w-xs mx-auto mt-8">
          <div className="flex flex-col w-full gap-2 lg:flex-row">
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input name="email" id="email-address" type="email"  placeholder="Enter your email" aria-describedby="emailHelp"  className="block w-full h-12 px-4 py-2 text-blue-500 duration-200 border rounded-lg appearance-none bg-chalk border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm" />
            <span id="emailHelp" className="sr-only">Please enter your email address to subscribe.</span>
            <button type="submit" aria-label="Primary action" className="inline-flex items-center justify-center w-full h-12 gap-3 px-5 py-3 font-medium text-white duration-200 bg-amber-500 md:w-auto rounded-xl hover:bg-amber-600 focus:ring-2 focus:ring-offset-2 focus:ring-black">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
	  /</section>
	);
}

export default AboutUs;
