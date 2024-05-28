import { IconType } from "react-icons"


interface ActionButtonProps{
    icon: IconType
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
}

const ActionButton:React.FC<ActionButtonProps> = ({icon: Icon, onClick, disabled}) => {
  return (
    <div>
        <button onClick={onClick} disabled={disabled} 
        className={`flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] 
        text-slate-700 border border-zinc-400 ${disabled && 'opacity-50 cursor-not-allowed'}`}>
            <Icon size={18} />
        </button>
    </div>
  )
}

export default ActionButton