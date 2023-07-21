import logo from './logo.svg';
import './App.css';
// import './landingComponents/landingForm';
import Reac, { useState, useEffect } from 'react';

function App() {
  return (
    HeroSection()
  );
}


const LandingForm = (showComponent, setShowComponent) => {

  const handleSubmit = (event) => {
    event.preventDefault(); // This prevents the default behavior of form submission (page refresh)
    // Add your form submission logic here, if needed
    // For example, you can access form data using event.target and perform actions based on it
    console.log("yo")

    setShowComponent(true)
  }

  const [showModel, setShowModel] = useState(false);

  const handleModelToggle = () => {
    setShowModel(!showModel);
  };

  return (
    <>
      <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="text"
                autoComplete="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Analyze Games
            </button>
          </div>
        </form >

        <p className="mt-10 text-center text-sm text-gray-500">
          Got a suggestion?{' '}
          <a href="#" onClick={handleModelToggle} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Submit any bugs here
            {showModel && <FeedbackForm />}
          </a>
        </p>
      </div >
    </>
  )
}

const Grid = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Replace the divs below with your content for each cell */}
      <div className="p-4">{gameCard()}</div>
      <div className="p-4">{gameCard()}</div>
      <div className="p-4">{gameCard()}</div>
      <div className="p-4">{gameCard()}</div>
      <div className="p-4">{gameCard()}</div>
      <div className="p-4">{gameCard()}</div>
    </div>
  );
};

function gameCard() {
  var whiteKnight = "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/chess_piece_knight_white.png"
  var blackKnight = "https://img.freepik.com/free-icon/strategy_318-302817.jpg?t=st=1689738547~exp=1689739147~hmac=40c7bf99944a8259d71ce85d01caed61863e4a7facc32d784cb8a2ce917271db"
  return (
    <>
      <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
        <div class="flex justify-center md:justify-end -mt-16">
          <img class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500" src={blackKnight} />
        </div>
        <div>
          <h2 class="text-gray-800 text-3xl font-semibold">noopdogg07</h2>
          <p class="mt-2 text-gray-600">Seems like you played well here, but couldn't quite get the win!</p>
        </div>
        <div class="flex justify-end mt-4">
          <a href="#" class="text-xl font-medium text-indigo-500">View Game</a>
        </div>
      </div>
    </>
  )
}

const HeroSection = (props) => {
  const [showComponent, setShowComponent] = useState(false);

  const handleButtonClick = () => {
    setShowComponent(true);
  };

  return (
    <>
      <div class="bg-white">
        <header class="absolute inset-x-0 top-0 z-50">
          <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div class="flex lg:flex-1">
              <a href="#" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
              </a>
            </div>
            <div class="flex lg:hidden">
              <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                <span class="sr-only">Open main menu</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
            <div class="hidden lg:flex lg:gap-x-12">
              <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Product</a>
              <a href="#" class="text-sm font-semibold leading-6 text-gray-900">About</a>
              <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Contact</a>
            </div>
            <div class="hidden lg:flex lg:flex-1 lg:justify-end">
              <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
            </div>
          </nav>
          {/* <!-- Mobile menu, show/hide based on menu open state. --> */}
          {/* <div class="lg:hidden" role="dialog" aria-modal="true"> */}
          {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
          {/* <div class="fixed inset-0 z-50"></div>
            <div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div class="flex items-center justify-between">
                <a href="#" class="-m-1.5 p-1.5">
                  <span class="sr-only">Your Company</span>
                  <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </a>
                <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
                  <span class="sr-only">Close menu</span>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="mt-6 flow-root">
                <div class="-my-6 divide-y divide-gray-500/10">
                  <div class="space-y-2 py-6">
                    <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Product</a>
                    <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</a>
                    <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</a>
                    <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</a>
                  </div>
                  <div class="py-6">
                    <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
                  </div>
                </div>
              </div>
            </div> */}
          {/* </div> */}
        </header>

        <div class="relative isolate px-6 lg:px-8">
          <div class="mx-auto max-w-2xl py-32">
            <div class="text-center">
              <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Chess analysis with AI, tailored for your skill set.</h1>
              <p class="mt-6 text-lg leading-8 text-gray-600">Get started by entering a Chess.com username to get feedback on your recent games.</p>
              <div class="mt-10 flex items-center justify-center gap-x-6">
                {LandingForm(showComponent, setShowComponent)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showComponent ? <Grid /> : null}
    </>
  )
}

function FeedbackForm() {

  const [isOpen, setIsOpen] = useState(false)

  const handleOverlayClick = (event) => {
    // Prevent the click event from propagating to underlying elements
    event.stopPropagation();
  };

  const handleCloseModal = () => {
    // Add your code here to handle modal closure
  };

  return (
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleCloseModal}></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" onClick={handleCloseModal}>
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg" onClick={(event) => event.stopPropagation()}>
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                {/* <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div> */}
                <InputForm />
                {/* <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Feedback</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Your critiques or compliments are important! Feel free to let us know about any improvements, things you liked, etc. below.</p>
                  </div>
                </div> */}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InputForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFormButtonClick = (event) => {
    // Access the inputValue here and do whatever you want with it
    event.preventDefault();
    console.log("first name = " + firstName);
    console.log("last name = " + lastName);
    console.log("email = " + email);
    console.log("message " + message);
  };

  return (
    <div class="isolate bg-white px-6 py-24 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Feedback Form</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">Your critiques and compliments matter! Feel free to fill out the following form and let us know what you loved, or what we can improve on.</p>
      </div>
      <form class="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleFormButtonClick}>
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">First name</label>
            <div class="mt-2.5">
              <input type="text" value={firstName} onChange={handleFirstNameChange} name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900">Last name</label>
            <div class="mt-2.5">
              <input type="text" value={lastName} onChange={handleLastNameChange} name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
            <div class="mt-2.5">
              <input type="email" value={email} onChange={handleEmailChange} name="email" id="email" autocomplete="email" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="message" class="block text-sm font-semibold leading-6 text-gray-900">Message</label>
            <div class="mt-2.5">
              <textarea name="message" value={message} onChange={handleMessageChange} id="message" rows="4" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
            </div>
          </div>
        </div>
        <div class="mt-10">
          <button type="submit" class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send message</button>
        </div>
      </form>
    </div>

  )
}

export default App;