import UserBar from './DisplayPage/UserPage/UserBar';

export default function MenuBar() {

    return (
        <div className="flex flex-row justify-between">
            <h1 className="title-font pl-5">Quản lý cơ sở</h1>
            <div className="pr-5"><UserBar /></div>
        </div>
    );
}