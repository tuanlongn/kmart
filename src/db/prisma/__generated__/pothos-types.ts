import type { Prisma, User, AuthProvider, Category, Product, CategoriesOnProducts, ProductVariant, ProductImage, InventoryItem, CartItem, Order, Transaction } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        Where: Prisma.UserWhereUniqueInput;
        Fields: "orders" | "transactions" | "cartItems" | "AuthProvider";
        RelationName: "orders" | "transactions" | "cartItems" | "AuthProvider";
        ListRelations: "orders" | "transactions" | "cartItems" | "AuthProvider";
        Relations: {
            orders: {
                Shape: Order[];
                Types: PrismaTypes["Order"];
            };
            transactions: {
                Shape: Transaction[];
                Types: PrismaTypes["Transaction"];
            };
            cartItems: {
                Shape: CartItem[];
                Types: PrismaTypes["CartItem"];
            };
            AuthProvider: {
                Shape: AuthProvider[];
                Types: PrismaTypes["AuthProvider"];
            };
        };
    };
    AuthProvider: {
        Name: "AuthProvider";
        Shape: AuthProvider;
        Include: Prisma.AuthProviderInclude;
        Select: Prisma.AuthProviderSelect;
        Where: Prisma.AuthProviderWhereUniqueInput;
        Fields: "user";
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    Category: {
        Name: "Category";
        Shape: Category;
        Include: Prisma.CategoryInclude;
        Select: Prisma.CategorySelect;
        Where: Prisma.CategoryWhereUniqueInput;
        Fields: "categoriesOnProducts";
        RelationName: "categoriesOnProducts";
        ListRelations: "categoriesOnProducts";
        Relations: {
            categoriesOnProducts: {
                Shape: CategoriesOnProducts[];
                Types: PrismaTypes["CategoriesOnProducts"];
            };
        };
    };
    Product: {
        Name: "Product";
        Shape: Product;
        Include: Prisma.ProductInclude;
        Select: Prisma.ProductSelect;
        Where: Prisma.ProductWhereUniqueInput;
        Fields: "variants" | "categoriesOnProducts";
        RelationName: "variants" | "categoriesOnProducts";
        ListRelations: "variants" | "categoriesOnProducts";
        Relations: {
            variants: {
                Shape: ProductVariant[];
                Types: PrismaTypes["ProductVariant"];
            };
            categoriesOnProducts: {
                Shape: CategoriesOnProducts[];
                Types: PrismaTypes["CategoriesOnProducts"];
            };
        };
    };
    CategoriesOnProducts: {
        Name: "CategoriesOnProducts";
        Shape: CategoriesOnProducts;
        Include: Prisma.CategoriesOnProductsInclude;
        Select: Prisma.CategoriesOnProductsSelect;
        Where: Prisma.CategoriesOnProductsWhereUniqueInput;
        Fields: "product" | "category";
        RelationName: "product" | "category";
        ListRelations: never;
        Relations: {
            product: {
                Shape: Product;
                Types: PrismaTypes["Product"];
            };
            category: {
                Shape: Category;
                Types: PrismaTypes["Category"];
            };
        };
    };
    ProductVariant: {
        Name: "ProductVariant";
        Shape: ProductVariant;
        Include: Prisma.ProductVariantInclude;
        Select: Prisma.ProductVariantSelect;
        Where: Prisma.ProductVariantWhereUniqueInput;
        Fields: "product" | "image" | "inventoryItems" | "cartItems";
        RelationName: "product" | "image" | "inventoryItems" | "cartItems";
        ListRelations: "inventoryItems" | "cartItems";
        Relations: {
            product: {
                Shape: Product;
                Types: PrismaTypes["Product"];
            };
            image: {
                Shape: ProductImage;
                Types: PrismaTypes["ProductImage"];
            };
            inventoryItems: {
                Shape: InventoryItem[];
                Types: PrismaTypes["InventoryItem"];
            };
            cartItems: {
                Shape: CartItem[];
                Types: PrismaTypes["CartItem"];
            };
        };
    };
    ProductImage: {
        Name: "ProductImage";
        Shape: ProductImage;
        Include: Prisma.ProductImageInclude;
        Select: Prisma.ProductImageSelect;
        Where: Prisma.ProductImageWhereUniqueInput;
        Fields: "ProductVariant";
        RelationName: "ProductVariant";
        ListRelations: "ProductVariant";
        Relations: {
            ProductVariant: {
                Shape: ProductVariant[];
                Types: PrismaTypes["ProductVariant"];
            };
        };
    };
    InventoryItem: {
        Name: "InventoryItem";
        Shape: InventoryItem;
        Include: Prisma.InventoryItemInclude;
        Select: Prisma.InventoryItemSelect;
        Where: Prisma.InventoryItemWhereUniqueInput;
        Fields: "productVariant";
        RelationName: "productVariant";
        ListRelations: never;
        Relations: {
            productVariant: {
                Shape: ProductVariant;
                Types: PrismaTypes["ProductVariant"];
            };
        };
    };
    CartItem: {
        Name: "CartItem";
        Shape: CartItem;
        Include: Prisma.CartItemInclude;
        Select: Prisma.CartItemSelect;
        Where: Prisma.CartItemWhereUniqueInput;
        Fields: "user" | "productVariant" | "order";
        RelationName: "user" | "productVariant" | "order";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            productVariant: {
                Shape: ProductVariant;
                Types: PrismaTypes["ProductVariant"];
            };
            order: {
                Shape: Order | null;
                Types: PrismaTypes["Order"];
            };
        };
    };
    Order: {
        Name: "Order";
        Shape: Order;
        Include: Prisma.OrderInclude;
        Select: Prisma.OrderSelect;
        Where: Prisma.OrderWhereUniqueInput;
        Fields: "user" | "items" | "transactions";
        RelationName: "user" | "items" | "transactions";
        ListRelations: "items" | "transactions";
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
            items: {
                Shape: CartItem[];
                Types: PrismaTypes["CartItem"];
            };
            transactions: {
                Shape: Transaction[];
                Types: PrismaTypes["Transaction"];
            };
        };
    };
    Transaction: {
        Name: "Transaction";
        Shape: Transaction;
        Include: Prisma.TransactionInclude;
        Select: Prisma.TransactionSelect;
        Where: Prisma.TransactionWhereUniqueInput;
        Fields: "order" | "user";
        RelationName: "order" | "user";
        ListRelations: never;
        Relations: {
            order: {
                Shape: Order;
                Types: PrismaTypes["Order"];
            };
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
}