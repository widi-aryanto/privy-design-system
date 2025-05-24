import { fireEvent, render } from '@testing-library/vue'
import { delay } from 'nanodelay'
import { ref, nextTick } from 'vue'
import Nav from './Nav.vue'
import NavItemDropdown from './NavItemDropdown.vue'

it('should rendered properly without any props', () => {
  const screen = render({
    components: { Nav, NavItemDropdown },
    template  : `
      <Nav>
        <NavItemDropdown />
      </Nav>
    `,
  })

  const dropdown = screen.queryByTestId('nav-item-dropdown')

  expect(dropdown).toBeInTheDocument()
  expect(dropdown).toHaveClass('nav__item', 'nav__item--dropdown')
})

it('should be able to change button text via props `text`', () => {
  const screen = render({
    components: { Nav, NavItemDropdown },
    template  : `
      <Nav>
        <NavItemDropdown text="text" />
      </Nav>
    `,
  })

  const text = screen.queryByText('text')
  expect(text).toBeInTheDocument()
})

it('should be able to change to icon mode via `icon` prop', () => {
  const screen = render({
    components: { Nav, NavItemDropdown },
    template  : `
      <Nav>
        <NavItemDropdown icon />
      </Nav>
    `,
  })

  const button = screen.queryByTestId('dropdown-activator')

  expect(button).toHaveClass('btn--variant-ghost', 'btn--icon')
})

it('should be able to hide dropdown caret with `no-caret` prop', () => {
  const screen = render({
    components: { Nav, NavItemDropdown },
    template  : `
      <Nav>
        <NavItemDropdown no-caret />
      </Nav>
    `,
  })

  const button = screen.queryByTestId('dropdown-activator')
  const caret  = screen.queryByTestId('dropdown-caret')

  expect(button).toBeInTheDocument()
  expect(caret).not.toBeInTheDocument()
})

it('should be able to set size of dropdown with `size` prop', () => {
  const screen = render({
    components: { Nav, NavItemDropdown },
    template  : `
      <Nav>
        <NavItemDropdown size="sm" />
      </Nav>
    `,
  })

  const button = screen.queryByTestId('dropdown-activator')

  expect(button).toBeInTheDocument()
  expect(button).toHaveClass('btn--sm')
})

it('should be able to set placement of dropdown with `placement` prop', async () => {
  const screen = render({
    components: { Nav, NavItemDropdown },
    template  : `
      <Nav>
        <NavItemDropdown placement="bottom-start" />
      </Nav>
    `,
  })

  await delay(0)

  const dropdown = screen.queryByTestId('dropdown-menu')

  expect(dropdown).toHaveAttribute('data-popper-placement', 'bottom-start')
})

it('should be able to toggle dropdown via v-model', async () => {
  const model  = ref(false)
  const screen = render({
    components: { Nav, NavItemDropdown },
    template  : `
      <Nav>
        <NavItemDropdown v-model="model" />
      </Nav>
    `,
    setup () {
      return { model }
    },
  })

  let dropdown = screen.queryByTestId('dropdown-menu')
  expect(dropdown).not.toBeVisible()

  model.value = true
  await nextTick()

  dropdown = screen.queryByTestId('dropdown-menu')
  expect(dropdown).toBeVisible()

  await fireEvent.click(window)
  await delay(0)

  expect(model.value).toBe(false)
  expect(dropdown).not.toBeVisible()
})

it('should be able to add class in the dropdown container via `menu-class` props', () => {
  const screen = render({
    components: { NavItemDropdown },
    template  : `
      <NavItemDropdown menu-class="custom-dropdown" />
    `,
  })

  const menu = screen.queryByTestId('dropdown-menu')
  expect(menu).toBeInTheDocument()
  expect(menu).toHaveClass('custom-dropdown')
})

it('should be able to add size in the dropdown container via `menu-size` props', () => {
  const screen = render({
    components: { NavItemDropdown },
    template  : `
      <NavItemDropdown menu-size="lg" />
    `,
  })

  const menu = screen.queryByTestId('dropdown')
  expect(menu).toBeInTheDocument()
  expect(menu).toHaveClass('dropdown--menu-lg')
  expect(menu).not.toHaveClass('dropdown--menu-sm')
})

it('should be able to add divider in the dropdown-item via `divider` props', () => {
  const screen = render({
    components: { NavItemDropdown },
    template  : `
      <NavItemDropdown divider />
    `,
  })

  const dropdown = screen.queryByTestId('dropdown')
  expect(dropdown).toBeInTheDocument()
  expect(dropdown).toHaveClass('dropdown--divider')
})
