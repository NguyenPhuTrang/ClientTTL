import { StarIcon } from '@heroicons/react/20/solid'


interface Props {
    product: any;
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

const ProductOverview = ({
    product
}: Props) => {
    function formatMoney(amount: any) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                {/* Product details */}
                <div className="lg:max-w-lg lg:self-end">
                    <div className="mt-4">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
                    </div>

                    <section aria-labelledby="information-heading" className="mt-4">
                        <h2 id="information-heading" className="sr-only">
                            Product information
                        </h2>

                        <div className="flex items-center">
                            <p className="text-lg text-gray-900 sm:text-xl">${formatMoney(product.price)}</p>

                            <div className="ml-4 border-l border-gray-300 pl-4">
                                <h2 className="sr-only">Reviews</h2>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    product.rating > rating ? 'text-[#FB8200]' : 'text-gray-300',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 space-y-6">
                            <p className="text-base text-gray-500">{product.description}</p>
                        </div>
                    </section>
                </div>

                <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                        <img src={product.image} alt='img' className="h-full w-full object-cover object-center" />
                    </div>
                </div>

                <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                    <section aria-labelledby="options-heading">
                        <h2 id="options-heading" className="sr-only">
                            Product options
                        </h2>

                        <form>
                            <div className="mt-10">
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    Add to card
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ProductOverview;