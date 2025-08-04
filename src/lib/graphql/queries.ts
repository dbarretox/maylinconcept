import { graphQLFetch, authenticatedRequest } from './client'
import { Product } from '@/types/product'
import { OrderInput, OrderItem, OrderResponse, OrderStatus } from '@/types/order'

interface ProductsResponse {
    products: {
        nodes: Product[]
        pageInfo: {
            hasNextPage: boolean
            endCursor: string
            }
    }
}

export const GET_ALL_PRODUCTS = `
    query GetAllProducts($first: Int = 20, $after: String) {
        products(first: $first, after: $after) {
            nodes {
                id
                databaseId
                title
                slug
                productFields {
                    price
                    mainImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    secondaryImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    shortDescription
                    fullDescription
                    inStock
                    availableSizes
                    availableColors
                    allowsCustomDesign
                    customDesignPrice
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`

export async function getProducts(
    first: number = 20, 
    after?: string
): Promise<ProductsResponse> {
    const data = await graphQLFetch<ProductsResponse>(
        GET_ALL_PRODUCTS,
        { first, after }
    )
    return data
}

export const GET_PRODUCT_BY_SLUG = `
    query GetProductBySlug($slug: String!) {
        productBy(slug: $slug) {
            id
            databaseId
            title
            slug
            productFields {
                price
                mainImage {
                    node {
                        sourceUrl
                        altText
                        mediaDetails {
                            width
                            height
                        }
                    }
                }
                secondaryImage {
                    node {
                    sourceUrl
                        altText
                        mediaDetails {
                            width
                            height
                        }
                    }
                }
                shortDescription
                fullDescription
                inStock
                availableSizes
                availableColors
                allowsCustomDesign
                customDesignPrice
            }
        }
    }
`
export async function getProductBySlug(slug: string) {
    const data = await graphQLFetch<{ productBy: Product }>(
        GET_PRODUCT_BY_SLUG,
        { slug }
    )
    return data
}

export const CREATE_ORDER_MUTATION = `
    mutation CreateOrder($input: CreateShopOrderInput!) {
        createShopOrder(input: $input) {
            shopOrder {
                id
                databaseId
                title
                orderFields {
                    customerName
                    customerEmail
                    customerPhone
                    orderItems
                    orderTotal
                    paymentReceipt {
                        node {
                            mediaItemUrl
                            title
                        }
                    }
                    orderStatus
                    shippingAddress
                    orderNotes
                    adminNotes
                    customDesignFiles {
                        nodes {
                            mediaItemUrl
                            title
                        }
                    }
                }
            }
        }
    }
`

export async function createOrder(
    items: OrderItem[],
    customerData: {
      name: string
        email: string
        phone: string
        address?: string
        notes?: string
    },
    paymentReceiptId?: string,
    customDesignIds?: string[]
) {
    const orderItemsText = items.map(item =>
      `${item.productName}
        Cantidad: ${item.quantity}
        Precio: $${item.price}
        ${item.selectedSize ? `Talla: ${item.selectedSize}` : ''}
        ${item.selectedColor ? `Color: ${item.selectedColor}` : ''}
        ${item.customDesignUrl ? 'Con diseño personalizado' : ''}
        Subtotal: $${item.subtotal}
        ---`
    ).join('\n')
    
    const orderTotal = items.reduce((sum, item) => sum + item.subtotal, 0)

    const input = {
        title: `Pedido - ${customerData.name}`,
        status: 'publish',
        orderFields: {
            customerName: customerData.name,
            customerEmail: customerData.email,
            customerPhone: customerData.phone,
            orderItems: orderItemsText,
            orderTotal: orderTotal,
            orderStatus: 'pending',
            ...(customerData.address && { shippingAddress: customerData.address }),
            ...(customerData.notes && { orderNotes: customerData.notes }),
            ...(paymentReceiptId && { paymentReceipt: paymentReceiptId }),
            ...(customDesignIds?.length && { customDesignFiles: customDesignIds })
        }
    }
    
    return await authenticatedRequest<{ createShopOrder: { shopOrder: OrderResponse } }>(
        CREATE_ORDER_MUTATION,
        { input }
    )
}

export const GET_ORDERS = `
    query GetOrders($first: Int = 10, $after: String, $status: String) {
        shopOrders(
            first: $first, 
            after: $after,
            where: { 
                orderby: { field: DATE, order: DESC },
                ...(status && { metaQuery: {
                    key: "order_status",
                    value: status
                    }})
            }
        ) {
            nodes {
                id
                databaseId
                title
                date
                orderFields {
                    customerName
                    customerEmail
                    orderTotal
                    orderStatus
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`

export async function getOrders(
    limit: number = 10,
    after?: string,
    status?: OrderStatus
) {
    return await authenticatedRequest<{
        shopOrders: {
            nodes: OrderResponse[]
            pageInfo: {
                hasNextPage: boolean
                endCursor: string
            }
        }
    }>(GET_ORDERS, { first: limit, after, status })
}

export const GET_ORDER_BY_ID = `
    query GetOrderById($id: ID!) {
        shopOrder(id: $id) {
            id
            databaseId
            title
            date
            orderFields {
                customerName
                customerEmail
                customerPhone
                orderItems
                orderTotal
                paymentReceipt {
                    node {
                        mediaItemUrl
                    }
                }
                orderStatus
                shippingAddress
                orderNotes
            }
        }
    }
`

export async function getOrderById(id: string) {
    return await authenticatedRequest<{ shopOrder: OrderResponse }>(
        GET_ORDER_BY_ID,
        { id }
    )
}