import { DotsHorizontalIcon } from "@heroicons/react/solid";

export default function Loading() {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-center">
                <DotsHorizontalIcon className="w-36 h-36 text-slate-600" />
            </div>
            <div className="flex flex-row justify-center font-bungee text-2xl text-slate-600">Đang tải</div>
        </div>
    )
}