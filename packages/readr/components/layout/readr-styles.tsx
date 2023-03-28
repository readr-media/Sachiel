import { createGlobalStyle } from 'styled-components'

/**
 * 應放入客製化的全局基底樣式
 */
export const ReadrStyles = createGlobalStyle`
html {
  font-family: 'Noto Sans TC', sans-serif;
}

picture {
  display: block;
}

a {
  cursor: pointer;
}

button {
  &:focus {
    outline: none;
  }
}

button,
input,
optgroup,
select,
textarea,
a {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  word-wrap: break-word;
}
`
