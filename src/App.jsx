import { useState, useCallback, useEffect, useRef  } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [Allow_num, setAllow_num] = useState(false)
  const[Allow_char, setAllow_char] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passRef = useRef(null)

  const passGen = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(Allow_num) str += "0123456789"
    if(Allow_char) str += "!@#$%^&*_-=+{}[]`~"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, Allow_num, Allow_char, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select()
    passRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passGen()
  }, [length, Allow_num, Allow_char, passGen])
  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
      <h1 className='text-white text-center my-3 '>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passRef}
          />

          <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
             defaultChecked={Allow_num}
             id="numberInput"
             onChange={()=>{
              setAllow_num((prev) => !prev)
             }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
             defaultChecked={Allow_char}
             id="charInput"
             onChange={()=>{
              setAllow_char((prev) => !prev)
             }}
            />
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
