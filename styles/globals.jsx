import css from 'styled-jsx/css';

export const globalStyles = css.global`
.font-bold {
    font-weight: bold !important;
}

.font-italic {
    font-style: italic;
}

.podcast-details-container {
    width: 1200px;
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}

.podcast-details-container .list-right-side-container {
    max-width: 65%;
}

.podcast-details-container tbody {
    font-weight: normal;
}

.podcast-details-container tbody a {
    color: blue;
}

.podcast-details-container tbody a:hover {
    text-decoration: underline;
}

.podcast-details-container tbody tr {
    border-top: 1px solid var(--bs-gray-300);
}

.podcast-details-container tbody tr:first-child {
    border-top: 2px solid var(--bs-gray-300);
}

.podcast-details-container tbody tr:nth-child(odd) {
    background: var(--bs-gray-100);
}

.podcast-details-container thead th,
.podcast-details-container tbody td {
    padding: 10px;
}

.podcast-details-container tbody td:nth-child(2) {
    white-space: nowrap;
}

.podcast-details-container tbody td:nth-child(3) {
    text-align: center;
}
`