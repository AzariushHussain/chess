import { Button } from "../components/Button";

export const Landing = () =>
{

    return <div className="p-24">
        <div className="pt-8 ">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex justify-center">
                    <img src={"/chessboard.jpeg"} className="max-w-96" />
                </div>
                <div className="pt-16">
                    <div className="flex justify-center">
                    <h1 className="text-4xl font-bold text-white">
                        Play chess online on #1 Site!
                    </h1>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <Button routename="/game" buttonname = "Play Online"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}