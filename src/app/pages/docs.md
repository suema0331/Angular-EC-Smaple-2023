# src/app/pages

Describe pages corresponding to each routing. [*-*] means screen ID.

- `ShopTopComponent`: [1-1] Shop Top screen.
  - **Display Messages from the store staffs function**: Enabling the `notice_available_flag` in the `store_message` collection from the firebase console allows us to display messages from registered stores. I would like to make these functions easy to operate by providing an admin app for store staff to edit messages or products by them.
  - **Store holiday setting function**: Enable `store_available_flag` in the `store_message` collection from the firebase console to make the store closed and unable to place orders.
  - **System maintenance function**: Enabling `user_app_run_status` in the `system-status` collection puts the entire system into maintenance mode. Multiple apps can have their own values, such as the user app and admin app.
- `SearchComponent`: [1-2] Search screen.
- `MaintenanceComponent`: [1-3] Sysyem Maintenance screen.
- `LoginComponent`: [1-4] Login screen.
- `SignupComponent`: [1-5] Signup screen.
- `PageNotFoundComponent`: [1-6] Page Not Found screen.
- `ShopGuideComponent`: [1-7] Shop Guide Modal screen. It will be displayed when you first transition to the top page after registering as a member.
- `ProductListComponent`: [2-1] Product List screen.
  - **Add-to-cart function**: We can set the maximum constraint number of items to be purchased for each product. Now it is registered as up to 10 items, so you cannot add more than 10 items to the cart.
- `ProductDetailComponent`: [2-2] Product Detail screen.
  - **Favorite registration function**: Registering a product as a favorite allows you to view it from the Favorite Product screen.
- `MypageComponent`: [3-1] My page screen.
  - If the user is logged in, it will display the user's photo, whether Email verification has been completed, and the last login date.
  - The user's avatar is obtained by specifying a Multiavatar avatar from a randomly generated number using the Multiavatar API.(https://multiavatar.com/)
- `FavoriteComponent`: [3-2] Favorite Product List screen.
  - To demonstrate the `Guard` function, **only logged-in users** can view this screen.(for demonstration purposes only​​)
  - Sold-out products are sorted so that they are lined up last.
- `PastitemComponent`: [3-3] Purchased Product List screen.
  - To demonstrate the `Guard` function, **only VIP users** can view the screen.(in this case, only the user named "test")
- `CartComponent`: [4-1] Cart screen.
  - You can empty the entire contents of your cart.
  - Items added to the cart are dynamically reflected in the cart screen and cart buttons. At this point, I am temporarily storing the cart in local storage, but if we have a backend, I would like to send the products cached in local storage to the backend at regular intervals to keep them in sync. This way, the cart information can be immediately reflected on the screen and is not dependent on the browser or device.
- `ConfirmCartClearModalComponent`: [4-2] Confirm Cart Clear Modal screen.
- `ConfirmOrderModalComponent`: [4-3] Confirm Order Modal screen.
