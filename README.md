Preface:
Build a RESTful API that can /create/read/update/delete Product and Category data from a persistence database.
## Models:-
## Product Model:
{
productId : xxx,		// Product ID
productName : xxx,		// Product Name
qtyPerUnit : xxx,		// Quantity of the Product
unitPrice : xxx,			// Unit Price of the Product
unitInStock : xxx,		// Unit in Stock
discontinued :  xxx,		// Boolean (yes/no)
categoryId : xxx,		// Category ID
}
## Category Model:
{
categoryId : xxx,		// Category ID
categoryName : xxx,		// Category Name
}


## functionality
 

> The data should be saved in the DB.

> Category ID in product table should be referenced in the category table.
> 
Provide proper unit tests.

Provide proper API documents.

>create should create the product and category.
>
>read should read particular record from the product table (if product has any category then category should be fetched in the response)
>
>readAll should read all the records from the product table (if product has any category then category should be fetched in the response)
>
>update should update one particular record of the product
>
>delete should delete one particular record of the product.



