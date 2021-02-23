export type File = {
  node: {
    id: string
    name: string
    relativeDirectory: string
    childImageSharp: {
      id: string
      fixed: any
    }
  }
}
export type WooProduct = {
  node: {
    id: string
    wordpress_id: string
    name: string
    price: string
    description: string
    images: [
      localFile: {
        childImageSharp: {
          fluid: any
          fixed: any
        }
      }
    ]
    categories: {
      wordpress_id: string
    }
  }
}
