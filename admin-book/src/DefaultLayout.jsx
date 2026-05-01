import Sidebarmenu from "./Sidebarmenu";
import { Route , Routes} from 'react-router-dom';
import AddBook from './books/AddBook';
import BookList from './books/BookList';
import BookEdit from './books/BookEdit';
import AddMobile from './phones/AddMobile';
import MobileEdit from './phones/MobileEdit';
import MobileList from './phones/MobileList'
import DiscountList from "./discounts/DiscountList"
import AddDiscount from "./discounts/AddDiscount"
import BookDetail from './books/BookDetail';
import MobileDetail from './phones/MobileDetail';
import PlaceList from "./bookatplace/PlaceList";
import AddPlace from "./bookatplace/AddPlace";
import EditPlaceForBook from "./bookatplace/EditPlaceForBook";
import DiscountEdit from "./discounts/DiscountEdit";
import AddPlaceForMobile from "./mobileatplace/AddPlaceForMobile";
import PlaceListForMobile from "./mobileatplace/PlaceListForMobile";
import EditPlaceForMobile from "./mobileatplace/EditPlaceForMobile";
import TransactionList from "./transaction/TransactionList";
import ReviewList from "./review/ReviewList";
// import AddDiscountForMobile from "./discounts/AddDiscountForMobile";
function DefaultLayout() {
    return (
        <>
            <Sidebarmenu>
                <Routes>
                    <Route path="/books" element={<BookList></BookList>}></Route>
                    <Route path="/add/book" element={<AddBook></AddBook>}></Route>
                    <Route path="/edit/book/:id" element={<BookEdit></BookEdit>}></Route>
                    <Route path='/book/detail/:id' element={<BookDetail></BookDetail>}></Route>
                    <Route path="/add/mobile" element={<AddMobile></AddMobile>}></Route>
                    <Route path="/mobiles" element={<MobileList></MobileList>}></Route>
                    <Route path="/edit/mobile/:id" element={<MobileEdit></MobileEdit>}></Route>
                    <Route path='/mobile/detail/:id' element={ <MobileDetail></MobileDetail>}></Route>
                    <Route path="/discounts" element={<DiscountList></DiscountList>}></Route>
                    <Route path="/add/discount" element={<AddDiscount></AddDiscount>}></Route>
                    <Route path="/places" element={ <PlaceList></PlaceList>}></Route>
                    <Route path="/add/place" element={<AddPlace></AddPlace>}></Route>
                    <Route path="/edit/place/:id" element={<EditPlaceForBook> </EditPlaceForBook>}></Route>
                    <Route path="/edit/discount/:id" element={<DiscountEdit></DiscountEdit>}></Route>
                    {/* <Route path="/add/discount" element={<AddDiscountForMobile></AddDiscountForMobile>}></Route> */}
                    <Route path="/places" element={<AddPlaceForMobile></AddPlaceForMobile>}></Route>
                    <Route path="" element={<PlaceListForMobile></PlaceListForMobile>}></Route>
                    <Route path="" element={<EditPlaceForMobile></EditPlaceForMobile>}></Route>
                    <Route path="/transaction" element={<TransactionList></TransactionList>}></Route>
                    <Route path="/reviews" element={<ReviewList></ReviewList>}></Route>
                    </Routes>
               
            </Sidebarmenu>
        </>
    )
}
export default DefaultLayout;