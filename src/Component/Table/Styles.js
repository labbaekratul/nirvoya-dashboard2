import styled from "styled-components";

const Styles = styled.div`
  .editLink {
    color: #011a28 !important;
    background: #f7f7f7;
    padding: 8px 12px;
    transition: ease 0.2s all;
    &:hover {
      box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) !important;
    }
    &:hover .BsPencil {
      color: #42d697 !important;
    }
  }
  button {
    transition: ease 0.2s all;
    border: none !important;
    background: #f7f7f7;
    &:hover {
      box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) !important;
    }
    &:hover .BsPencil {
      color: #42d697 !important;
    }
    &:hover .BsTrash {
      color: #fe696a;
    }
  }

  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    // border: 1px solid black;
    width: 100%;
    border-spacing: 0;
    border-color: transparent;

    thead {
      background: rgb(2, 52, 79);
      color: #fff;
      border-radius: 5px;
      tr {
        background: #f0f0f0;
        color: #000;
        &:hover {
          background: #f0f0f0 !important;
        }
        th {
          transition: ease-in 0.2s all;
          border: none;
          &:hover {
            transform: scale(1.05);
            background: #e5e5e5;
          }
        }
      }
    }

    tr {
      border-bottom: 1px solid #ddd;
      transition: ease-in-out 0.2s all;
      &:hover {
        --bs-table-accent-bg: none;
        /* letter-spacing: 0.2px; */
        background: #f6f8fa !important;
      }
      :last-child {
        td {
          border-bottom: 1px solid #ddd;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      // border-bottom: 1px solid black;
      // border-right: 1px solid black;

      /* The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
  }

  button {
    border: 1px solid #ccc;
    padding: 5px 12px;
    background: ccc;
  }
  button:disabled {
    background: transparent;
    opacity: 0.5;
  }

  .pagination {
    padding: 0.5rem;
  }
`;

export default Styles;
