import {
  queryAllByTestId,
  queryByTestId,
  queryByText,
} from '@testing-library/vue'
import { defineComponent } from 'vue'
import {
  removeSingleton,
  resetInstance,
  useSingleton,
} from './use-singleton'

const mockComponent = defineComponent({
  template: `
    <div data-testid="mock">
      Hello, This is global component
    </div>
  `,
})

describe('useSingleton', () => {
  afterEach(async () => {
    return await resetInstance()
  })

  it('should be able render given component into global container', async () => {
    await useSingleton(mockComponent)

    const target = queryByTestId(document.body, 'mock')
    const text   = queryByText(document.body, 'Hello, This is global component')

    expect(target).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })

  it('should be only create single instance per component', async () => {
    await useSingleton(mockComponent)
    await useSingleton(mockComponent)

    const target = queryAllByTestId(document.body, 'mock')

    expect(target).toHaveLength(1)
  })
})

describe('removeSingleton', () => {
  it('should be able remove component in global container', async () => {
    await useSingleton(mockComponent)

    const target = queryByTestId(document.body, 'mock')
    const text   = queryByText(document.body, 'Hello, This is global component')

    expect(target).toBeInTheDocument()
    expect(text).toBeInTheDocument()

    await removeSingleton(mockComponent)

    expect(target).not.toBeInTheDocument()
    expect(text).not.toBeInTheDocument()
  })
})
