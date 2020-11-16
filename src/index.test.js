import { screen } from '@testing-library/dom'

test('example', () => {
  document.body.innerHTML = `
    <div id="app">hey</div>
  `
  expect(screen.getByText('hey')).toBeInTheDocument()
})
