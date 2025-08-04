const endpoint = 'https://admin.maylinconcept.com/graphql'

export async function graphQLFetch<T = any>(
  query: string,
  variables?: any
): Promise<T> {
  try {
    console.log('Fetching from:', endpoint)
    console.log('Variables:', variables)
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables
      }),
      next: { revalidate: 60 }
    })

    const text = await response.text()
    console.log('Response text:', text)
    
    let json
    try {
      json = JSON.parse(text)
    } catch (e) {
      console.error('Failed to parse JSON:', text)
      throw new Error('Invalid JSON response from GraphQL')
    }
    
    if (json.errors) {
      console.error('GraphQL errors:', json.errors)
      throw new Error(json.errors[0]?.message || 'GraphQL error occurred')
    }

    return json.data
  } catch (error) {
    console.error('graphQLFetch error:', error)
    throw error
  }
}

export async function authenticatedRequest<T = any>(
  query: string,
  variables?: any
): Promise<T> {
  return graphQLFetch<T>(query, variables)
}