import { IconType } from "react-icons"

interface ChoiceInputProps{
    text: string
    icon: IconType
    onClick: (value: string) => void
    selected?: boolean 
}
const ChoiceInput:React.FC<ChoiceInputProps> = ({ text, icon: Icon, onClick, selected }) => {
  return (
    <div onClick={() => onClick(text)} className={`my-3 cursor-pointer px-4 py-2 rounded-lg flex items-center gap-2 justify-center h-16 border ${selected ? "border-black" : "border-gray-300"}`}>
        <Icon />
        <span className="text-slate-700 text-md">{text}</span>
    </div>
  )
}

export default ChoiceInput