import '@testing-library/jest-dom'

import { render } from '@testing-library/react'

import DefaultNav from '@/components/layout-template/nav/default-nav'

jest.mock('@/constants/layout', () => ({
  useMobileNavIcons: () => [],
  useNonMobileNavIcons: () => ({
    first: [],
    second: [],
    third: [],
  }),
}))

jest.mock('@/context/user', () => ({
  useUser: () => ({
    user: {
      avatar: 'test-avatar-url',
      customId: 'test-user-id',
    },
  }),
  isUserLoggedIn: () => false,
}))

jest.mock('@/utils/nav-button', () => ({
  matchPath: () => false,
}))

describe('DefaultNav', () => {
  it('renders without crashing', () => {
    const { container } = render(<DefaultNav />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = render(<DefaultNav className="test-class" />)
    expect(container.firstChild).toHaveClass('test-class')
  })
})
