import { fireEvent, render } from '@testing-library/vue'
import { delay } from 'nanodelay'
import { vi } from 'vitest'
import { nextTick, ref } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import { until } from '@vueuse/core'

const nextFocus = vi.fn()
const prevFocus = vi.fn()

vi.mock('./utils/use-focus', () => {
  function useFocus () {
    return {
      next: nextFocus,
      prev: prevFocus,
    }
  }

  return { useFocus }
})

afterEach(() => {
  vi.resetAllMocks()
})

it('should render properly without any props', () => {
  const screen = render({
    components: { Dropdown },
    template  : `
      <Dropdown />
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')

  expect(dropdown).toBeInTheDocument()
})

it('should be able to change button text via props `text`', () => {
  const screen = render({
    components: { Dropdown },
    template  : `
      <Dropdown text="Hello World" />
    `,
  })

  const text = screen.queryByText('Hello World')

  expect(text).toBeInTheDocument()
})

it('should toggle dropdown menu if button clicked', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).not.toHaveClass('dropdown--open')
  expect(menu).not.toBeVisible()
})

it('should be able to change placement via props `placement`', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown placement="top-end" text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  await delay(0)

  const menu = screen.queryByTestId('dropdown-menu')

  expect(menu).toHaveAttribute('data-popper-placement', 'top-end')
})

it('should hide when `Escape` key is pressed', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.keyDown(window, { key: 'Escape' })

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).not.toHaveClass('dropdown--open')
  expect(menu).not.toBeVisible()
})

it('should hide when click outside', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.click(window)
  await delay(0)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).not.toHaveClass('dropdown--open')
  expect(menu).not.toBeVisible()
})

it('should hide when click item clicked', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')
  const items    = screen.queryAllByTestId('dropdown-item')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.click(items.at(0))

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).not.toHaveClass('dropdown--open')
  expect(menu).not.toBeVisible()
})

it('should focus on next item when ArrowDown\'s key is pressed', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.keyDown(window, { key: 'ArrowDown' })

  expect(nextFocus).toBeCalled()
})

it('should focus on prev item when ArrowUp\'s key is pressed', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.keyDown(window, { key: 'ArrowUp' })

  expect(prevFocus).toBeCalled()
})

it('should focus on next item when Tab\'s key is pressed', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.keyDown(window, { key: 'Tab' })

  expect(nextFocus).toBeCalled()
})

it('should focus on prev item when Tab+Shift\'s key is pressed', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown text="Hello World">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.keyDown(window, { key: 'Tab', shiftKey: true })

  expect(prevFocus).toBeCalled()
})

it('should be able to custom activator button', async () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown>
        <template #activator="{ open }">
          <input
            data-testid="sample"
            @focus="open"
          />
        </template>
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  const input    = screen.queryByTestId('sample')

  expect(input).toBeInTheDocument()
  expect(dropdown).not.toHaveClass('dropdown--open')

  input.focus()
  await nextTick()

  expect(dropdown).toHaveClass('dropdown--open')
})

it('should be able to change button variant via `variant` prop', () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown variant="outline">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const button = screen.queryByTestId('dropdown-activator')

  expect(button).toHaveClass('btn--variant-outline')
})

it('should be able to change button color via `color` prop', () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown color="success">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const button = screen.queryByTestId('dropdown-activator')

  expect(button).toHaveClass('btn--success')
})

it('should be able to change button size via `size` prop', () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown size="lg">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const button = screen.queryByTestId('dropdown-activator')

  expect(button).toHaveClass('btn--lg')
})

it('should be able to change to pill mode via `pill` prop', () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown pill>
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const button = screen.queryByTestId('dropdown-activator')

  expect(button).toHaveClass('btn--pill')
})

it('should be able to change to icon mode via `icon` prop', () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown icon>
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const button = screen.queryByTestId('dropdown-activator')

  expect(button).toHaveClass('btn--icon')
})

it('should be able to toggle dropdown via v-model', async () => {
  const model  = ref(false)
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown v-model="model">
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
    setup () {
      return { model }
    },
  })

  const dropdown = screen.queryByTestId('dropdown')
  const button   = screen.queryByTestId('dropdown-activator')

  let menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(menu).not.toBeVisible()

  model.value = true
  await nextTick()

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveClass('dropdown--open')
  expect(menu).toBeVisible()

  await fireEvent.click(button)

  menu = screen.queryByTestId('dropdown-menu')

  expect(dropdown).not.toHaveClass('dropdown--open')
  expect(menu).not.toBeVisible()
  expect(model.value).toBe(false)
})

it('should hide caret icon if props `no-caret` is provided', () => {
  const screen = render({
    components: { Dropdown, DropdownItem },
    template  : `
      <Dropdown no-caret>
        <DropdownItem text="Item1" />
        <DropdownItem text="Item2" />
      </Dropdown>
    `,
  })

  const caret = screen.queryByTestId('dropdown-caret')

  expect(caret).not.toBeInTheDocument()
})

it('should have style "divider" if props `divider` has provided', () => {
  const screen = render({
    components: { Dropdown },
    template  : `
      <Dropdown divider />
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')

  expect(dropdown).toBeInTheDocument()
  expect(dropdown).toHaveClass('dropdown--divider')
})

it('should be able to add menu class in the dropdown container via `menu-class` props', () => {
  const screen = render({
    components: { Dropdown },
    template  : `
      <Dropdown menu-class="custom-class" />
    `,
  })

  const dropdownMenu = screen.queryByTestId('dropdown-menu')

  expect(dropdownMenu).toBeInTheDocument()
  expect(dropdownMenu).toHaveClass('custom-class')
})

it('should be able to add dropdown-menu-container size via `menu-size` props', () => {
  const screen = render({
    components: { Dropdown },
    template  : `
      <Dropdown menu-size="md" />
    `,
  })

  const dropdownMenu = screen.queryByTestId('dropdown')

  expect(dropdownMenu).toBeInTheDocument()
  expect(dropdownMenu).toHaveClass('dropdown--menu-md')
  expect(dropdownMenu).not.toHaveClass('dropdown--menu-sm')
})

it('should be able to add button class in the dropdown via `button-class` props', () => {
  const screen = render({
    components: { Dropdown },
    template  : `
      <Dropdown button-class="w-full" />
    `,
  })

  const dropdownMenu = screen.queryByTestId('dropdown-activator')

  expect(dropdownMenu).toBeInTheDocument()
  expect(dropdownMenu).toHaveClass('w-full')
})

it('should be able to header content inside dropdown menu using `prepend` slot', () => {
  const screen = render({
    components: { Dropdown },
    template  : `
      <Dropdown>
        <template #prepend>
          <button data-testid="test-prepend">
            Coba
          </button>
        </template>
      </Dropdown>
    `,
  })

  const dropdownMenu = screen.queryByTestId('dropdown-menu')
  const prepend      = screen.queryByTestId('test-prepend')

  expect(dropdownMenu).toHaveClass('dropdown__menu--has-prepend')
  expect(prepend).toBeInTheDocument()
})

it('should be able to header content inside dropdown menu using `append` slot', () => {
  const screen = render({
    components: { Dropdown },
    template  : `
      <Dropdown>
        <template #append>
          <button data-testid="test-append">
            Coba
          </button>
        </template>
      </Dropdown>
    `,
  })

  const dropdownMenu = screen.queryByTestId('dropdown-menu')
  const append       = screen.queryByTestId('test-append')

  expect(dropdownMenu).toHaveClass('dropdown__menu--has-append')
  expect(append).toBeInTheDocument()
})

it('should emit event `show` and `hide` when dropdown open/close (after animation complete)', async () => {
  const isShow = ref(false)
  const screen = render({
    components: { Dropdown },
    template  : `
      <Dropdown
        no-animation
        @show="isShow = true"
        @hide="isShow = false">
        Coba
      </Dropdown>
    `,
    setup () {
      return { isShow }
    },
  }, { global: { stubs: { transition: false } } })

  const dropdown     = screen.queryByTestId('dropdown')
  const button       = screen.queryByTestId('dropdown-activator')
  const dropdownMenu = screen.queryByTestId('dropdown-menu')

  dropdownMenu.style.transitionDuration = '1ms'

  await fireEvent.click(button)
  await until(isShow).toBe(true)

  expect(dropdown).toHaveClass('dropdown--open')

  await fireEvent.click(button)
  await until(isShow).toBe(false)

  expect(dropdown).not.toHaveClass('dropdown--open')
})
