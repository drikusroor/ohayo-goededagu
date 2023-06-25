import {
  BsJournalRichtext,
  BsFilm,
  BsSticky,
  BsImages,
  BsBrush,
  BsQuestion,
} from 'react-icons/bs'

import { render } from '@redwoodjs/testing/web'

import { getIcon, EPostType } from './ArticleTypeIcon'
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
    expect(container.querySelector('svg')).toHaveClass('BsJournalRichtext')
  })

  it('renders the correct icon for VIDEO type', () => {
    const { container } = render(<ArticleTypeIcon type={EPostType.VIDEO} />)
    expect(container.querySelector('svg')).toHaveClass('BsFilm')
  })

  it('renders the correct icon for HAIKU type', () => {
    const { container } = render(<ArticleTypeIcon type={EPostType.HAIKU} />)
    expect(container.querySelector('svg')).toHaveClass('BsSticky')
  })

  it('renders the correct icon for CHOTTO type', () => {
    const { container } = render(<ArticleTypeIcon type={EPostType.CHOTTO} />)
    expect(container.querySelector('svg')).toHaveClass('BsImages')
  })

  it('renders the correct icon for PHOTO_GALLERY type', () => {
    const { container } = render(
      <ArticleTypeIcon type={EPostType.PHOTO_GALLERY} />
    )
    expect(container.querySelector('svg')).toHaveClass('BsBrush')
  })

  it('renders the default icon for unknown types', () => {
    const { container } = render(<ArticleTypeIcon type="unknown" />)
    expect(container.querySelector('svg')).toHaveClass('BsQuestion')
  })
})

describe('getIcon', () => {
  it('returns the correct icon for ARTICLE type', () => {
    expect(getIcon(EPostType.ARTICLE)).toEqual(<BsJournalRichtext />)
  })

  it('returns the correct icon for VIDEO type', () => {
    expect(getIcon(EPostType.VIDEO)).toEqual(<BsFilm />)
  })

  it('returns the correct icon for HAIKU type', () => {
    expect(getIcon(EPostType.HAIKU)).toEqual(<BsSticky />)
  })

  it('returns the correct icon for CHOTTO type', () => {
    expect(getIcon(EPostType.CHOTTO)).toEqual(<BsImages />)
  })

  it('returns the correct icon for PHOTO_GALLERY type', () => {
    expect(getIcon(EPostType.PHOTO_GALLERY)).toEqual(<BsBrush />)
  })

  it('throws an error for unknown types', () => {
    expect(getIcon('unknown' as EPostType)).toEqual(<BsQuestion />)
  })
})
