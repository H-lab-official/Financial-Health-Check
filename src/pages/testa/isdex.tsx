import React, { ChangeEvent, useState, useRef, useEffect } from 'react'
import LogoImage from '@/public/images/logo.png'
import SearchIcon from '@/public/images/searchIcon.png'
import HamburgerIcon from '@/public/images/hamburgerIcon.png'
import { Quiz } from '@/data/quizzes'
import Image from 'next/image'
import { AnswerMap } from '@/types/user'
import { useRouter } from 'next/navigation'
import { artists } from '@/data/artists'

type Props = {
  quizzes: Quiz[]
  isSubmitting?: boolean
  onSubmit: (answers: AnswerMap) => void
}

const allSuggestions: string[] = artists.map((artist) => artist.name)

export default function Votes({ quizzes, isSubmitting, onSubmit }: Props) {
  const router = useRouter()
  const [queries, setQueries] = useState<string[]>(['', '', ''])
  const [suggestions, setSuggestions] = useState<string[][]>([[], [], []])
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null)

  const dropdownRefs = useRef<(HTMLUListElement | null)[]>([])

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const updatedQueries = [...queries]
    updatedQueries[index] = value
    setQueries(updatedQueries)

    if (value) {
      const availableSuggestions = allSuggestions.filter(
        (suggestion) => !selectedSuggestions.includes(suggestion)
      )

      const filteredSuggestions = Array.from(
        new Set(
          availableSuggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(value.toLowerCase())
          )
        )
      )

      const updatedSuggestions = [...suggestions]
      updatedSuggestions[index] = filteredSuggestions
      setSuggestions(updatedSuggestions)
    } else {
      const updatedSuggestions = [...suggestions]
      updatedSuggestions[index] = []
      setSuggestions(updatedSuggestions)
    }
  }

  const handleSelectSuggestion = (index: number, suggestion: string) => () => {
    const updatedSelectedSuggestions = [...selectedSuggestions]
    if (!updatedSelectedSuggestions.includes(suggestion)) {
      updatedSelectedSuggestions[index] = suggestion
      setSelectedSuggestions(updatedSelectedSuggestions)
    }

    const updatedSuggestions = [...suggestions]
    updatedSuggestions[index] = []
    setSuggestions(updatedSuggestions)
    setActiveIndex(null)
  }

  const handleRemoveSuggestion = (index: number) => () => {
    const updatedSelectedSuggestions = [...selectedSuggestions]
    updatedSelectedSuggestions[index] = ''
    setSelectedSuggestions(updatedSelectedSuggestions)

    const updatedQueries = [...queries]
    updatedQueries[index] = ''
    setQueries(updatedQueries)
  }

  const handleFocus = (index: number) => () => {
    setActiveIndex(index)
    const value = queries[index]

    if (value) {
      const availableSuggestions = allSuggestions.filter(
        (suggestion) => !selectedSuggestions.includes(suggestion)
      )

      const filteredSuggestions = Array.from(
        new Set(
          availableSuggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(value.toLowerCase())
          )
        )
      )

      const updatedSuggestions = [...suggestions]
      updatedSuggestions[index] = filteredSuggestions
      setSuggestions(updatedSuggestions)
    } else {
      const availableSuggestions = allSuggestions.filter(
        (suggestion) => !selectedSuggestions.includes(suggestion)
      )

      const updatedSuggestions = [...suggestions]
      updatedSuggestions[index] = availableSuggestions
      setSuggestions(updatedSuggestions)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (!dropdownRefs.current.some((ref) => ref && ref.contains(target))) {
        setActiveIndex(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSend = () => {
    const filteredSelectedSuggestions = selectedSuggestions.filter(
      (suggestion) => suggestion !== ''
    )

    if (filteredSelectedSuggestions.length === 0) {
      router.push('/')
    } else {
      console.log('Filtered Selected Suggestions:', filteredSelectedSuggestions)
    }
  }

  const handleDragStart = (index: number) => () => {
    setDraggedItemIndex(index)
  }

  const handleDragOver = (index: number) => (event: React.DragEvent) => {
    event.preventDefault()
    if (draggedItemIndex !== null && draggedItemIndex !== index) {
      const updatedSuggestions = [...selectedSuggestions]
      const draggedItem = updatedSuggestions[draggedItemIndex]
      updatedSuggestions.splice(draggedItemIndex, 1)
      updatedSuggestions.splice(index, 0, draggedItem)
      setDraggedItemIndex(index)
      setSelectedSuggestions(updatedSuggestions)
    }
  }

  const handleDragEnd = () => {
    setDraggedItemIndex(null)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 p-6 max-w-xl mx-auto">
      <Image
        src={LogoImage}
        width={130}
        height={95}
        style={{ width: 'auto', pointerEvents: 'none' }}
        priority={true}
        alt="Colorist Logo"
      />

      <div className="w-3/4 rounded-lg  shadow-lg bg-transparent ">
        <ul className=" space-y-8">
          {queries.map((query, index) => (
            <li
              key={index}
              draggable
              onDragStart={handleDragStart(index)}
              onDragOver={handleDragOver(index)}
              onDragEnd={handleDragEnd}
              className={` mb-2 bg-gray-100 rounded-md shadow-sm cursor-pointer text-center ${
                draggedItemIndex === index ? 'opacity-[0.4]' : ''
              }`}
              // className="relative w-full mb-2 flex justify-center"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={`Search`}
                  className="input px-16 w-full bg-[#D9D9D9] placeholder-black shadow-lg"
                  value={queries[index]}
                  onChange={handleChange(index)}
                  onFocus={handleFocus(index)}
                />
                <div className="absolute  left-2 top-1/2 transform -translate-y-1/2 bg-[#6F6F6F] p-3 text-xs rounded-lg  items-center">
                  <Image
                    src={SearchIcon}
                    width={10}
                    height={10}
                    style={{ width: 'auto', pointerEvents: 'none' }}
                    priority={true}
                    alt="Search Icon"
                  />
                </div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 text-xs rounded-lg  items-center">
                  <Image
                    src={HamburgerIcon}
                    width={10}
                    height={10}
                    style={{ width: 'auto', pointerEvents: 'none' }} // Ensure the image does not affect pointer events
                    priority={true}
                    alt="Hamburger Icon"
                  />
                </div>
                {selectedSuggestions[index] && (
                  <span className="absolute top-1/2 left-16 transform -translate-y-1/2 bg-[#6F6F6F] text-white px-2 py-1 text-xs rounded-full flex items-center">
                    {selectedSuggestions[index]}
                    <button
                      type="button"
                      className="ml-2 text-white"
                      onClick={handleRemoveSuggestion(index)}
                    >
                      &times;
                    </button>
                  </span>
                )}
                {/* {activeIndex === index && suggestions[index].length > 0 && (
                  <ul
                    className="absolute left-0 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-10 max-h-32 overflow-y-auto"
                    ref={(el) => (dropdownRefs.current[index] = el)}
                  >
                    {suggestions[index].map((suggestion, suggestionIndex) => (
                      <li
                        key={suggestionIndex}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-black"
                        onClick={handleSelectSuggestion(index, suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )} */}
                {activeIndex === index && suggestions[index].length > 0 && (
                  <ul
                    className="absolute left-0 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-10 max-h-32 overflow-y-auto scrollable-list"
                    ref={(el) => (dropdownRefs.current[index] = el)}
                  >
                    {suggestions[index].map((suggestion, suggestionIndex) => (
                      <li
                        key={suggestionIndex}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-black"
                        onClick={handleSelectSuggestion(index, suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="bg-[#6F6F6F] border-none rounded-lg w-3/4 py-3 text-sm font-semibold shadow-lg"
        onClick={handleSend}
      >
        {selectedSuggestions.filter((suggestion) => suggestion !== '').length > 0
          ? 'Send'
          : 'Back to Profile'}
      </button>
    </main>
  )
}
