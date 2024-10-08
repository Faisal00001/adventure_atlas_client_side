import MyWishListCard from "../../../components/MyWishListCard/MyWishListCard";
import useMyWishList from "../../../hooks/useMyWishList";

const MyWishList = () => {
    const [wishList] = useMyWishList()
    console.log(wishList)
    return (
        <div>
            <div className="py-20 px-5">
                <h3 className="text-center text-2xl md:text-4xl font-bold mb-10">My Wishlist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {
                        wishList.map(wishListItem => <MyWishListCard wishListItem={wishListItem} key={wishListItem._id}></MyWishListCard>)
                    }
                </div>

            </div>

        </div>
    );
};

export default MyWishList;