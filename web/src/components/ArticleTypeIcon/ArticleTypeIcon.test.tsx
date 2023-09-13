import { render } from '@redwoodjs/testing/web'

import { EPostType } from './ArticleTypeIcon'
import ArticleTypeIcon from './ArticleTypeIcon'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ArticleTypeIcon', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ArticleTypeIcon type={EPostType.ARTICLE} />)
    }).not.toThrow()
  })

  it('renders the correct icon for ARTICLE type', () => {
    const { container } = render(<ArticleTypeIcon type={EPostType.ARTICLE} />)
    expect(
      container.querySelector('[data-testid="BsJournalRichtext"]')
    ).toBeInTheDocument()
  })

  it('renders the correct icon for VIDEO type', () => {
    const { container } = render(<ArticleTypeIcon type={EPostType.VIDEO} />)
    expect(
      container.querySelector('[data-testid="BsFilm"]')
    ).toBeInTheDocument()
  })

  it('renders the correct icon for HAIKU type', () => {
    const { container } = render(<ArticleTypeIcon type={EPostType.HAIKU} />)
    expect(
      container.querySelector('[data-testid="BsBrush"]')
    ).toBeInTheDocument()
  })

  it('renders the correct icon for CHOTTO type', () => {
    const { container } = render(<ArticleTypeIcon type={EPostType.CHOTTO} />)
    expect(
      container.querySelector('[data-testid="BsSticky"]')
    ).toBeInTheDocument()
  })

  it('renders the correct icon for PHOTO_GALLERY type', () => {
    const { container } = render(
      <ArticleTypeIcon type={EPostType.PHOTO_GALLERY} />
    )
    expect(
      container.querySelector('[data-testid="BsImages"]')
    ).toBeInTheDocument()
  })

  it('renders the default icon for unknown types', () => {
    const { container } = render(<ArticleTypeIcon type="unknown" />)
    expect(
      container.querySelector('[data-testid="BsQuestion"]')
    ).toBeInTheDocument()
  })
})
