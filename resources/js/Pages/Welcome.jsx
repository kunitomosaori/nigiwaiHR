import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <header className="bg-gradient-to-r from-blue-500 to-emerald-300 text-white shadow-lg top-0 w-full">
                <div className="flex justify-between items-center p-6">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold mx-5">にぎわいHR</h1>
                    </div>
                    <div className="flex items-center gap-6">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="font-semibold text-white hover:text-gray-200 focus:outline focus:outline-2 focus:rounded-sm focus:outline-white transition duration-300 ease-in-out"
                            >
                                ダッシュボード
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('register')}
                                    className="font-semibold text-white hover:text-gray-200 focus:outline focus:outline-2 focus:rounded-sm focus:outline-white transition duration-300 ease-in-out"
                                >
                                    お問い合わせ
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-white hover:text-gray-200 focus:outline focus:outline-2 focus:rounded-sm focus:outline-white transition duration-300 ease-in-out"
                                >
                                    ログイン
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <section className="flex justify-center mb-8 bg-cover bg-center p-6" style={{ backgroundImage: "url('/img/背景画像.png')" }}>
                <div className="flex flex-col md:flex-row items-center bg-white bg-opacity-80 rounded-lg shadow-xl p-8">
                    <div className="flex flex-col md:w-1/3 text-left space-y-6">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">従業員のスキル情報を一元管理することで</p>
                            <p className="text-3xl font-bold text-gray-900">適切な人材配置を実現</p>
                            <p className="text-2xl font-bold" style={{ color: '#F8DF94' }}>顧客満足度No.1</p>
                        </div>
                        <Link
                            href={route('register')}
                            className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 text-white font-bold py-4 px-8 rounded-full mt-8 transition duration-300 ease-in-out shadow-lg"
                        >
                            資料ダウンロードはこちら
                        </Link>
                    </div>
                    <div className="md:w-2/3 p-4 mt-6 md:mt-0">
                        <div className="bg-gray-200 flex items-center justify-center rounded-lg shadow-xl" style={{ height: 'auto' }}>
                            <img src="/img/NigiwaiHRサービス写真.png" alt="サービス写真" className="rounded-lg shadow-xl w-full h-auto"></img>
                        </div>
                    </div>
                </div>
            </section>
            <section className="text-center mb-8 p-6">
                <h2 className="text-4xl font-bold mb-6">評価からスキル管理まで<br />クラウドひとつで完結</h2>
                <p className="mb-6 text-lg text-orange-500">
                    人材データの集約・一元管理と共に
                    戦略的な人事施策の実行をサポートいたします。
                </p>
                <p className="mb-6 text-lg">
                    人事のアナログな業務を、シンプルで使いやすいデータ管理でスムーズに進め、業務の効率を向上させます。蓄積されたデータを柔軟に分析し、離職防止や社員の育成・配置に役立てることができます。データに基づく意思決定をサポートします。
                </p>
            </section>
            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
