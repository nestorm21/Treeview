class Treeview extends HTMLElement {
  constructor() {
    super();
  }

  baseTemplate = `<style>
  ul,
  #myUL {
    list-style-type: none;
  }

  /* Remove margins and padding from the parent ul */
  #myUL {
    margin: 0;
    padding: 0;
  }

  /* Style the caret/arrow */
  .caret {
    cursor: pointer;
    user-select: none; /* Prevent text selection */
  }

  /* Create the caret/arrow with a unicode, and style it */
  .caret::before {
    content: '\\25B6';
    color: black;
    display: inline-block;
    margin-right: 6px;
  }

  /* Rotate the caret/arrow icon when clicked on (using JavaScript) */
  .caret-down::before {
    transform: rotate(90deg);
  }

  /* Hide the nested list */
  .nested {
    display: none;
  }

  /* Show the nested list when the user clicks on the caret/arrow (with JavaScript) */
  .active {
    display: block;
  }
</style>
<ul id="myUL">
</ul>`;

  connectedCallback() {
      
    this.options = JSON.parse(this.getAttribute('options'));
    this.innerHTML = this.baseTemplate;
    this.createTreeview(this.options, document.getElementById('myUL'));
    var toggler = document.getElementsByClassName('caret');
    var i;

    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener('click', function () {
        this.parentElement.querySelector('.nested').classList.toggle('active');
        this.classList.toggle('caret-down');
      });
    }
  }

  createTreeview(options, root) {
    options.forEach((opt) => {
      if (opt.children) {
        const newEl = document.createElement('li');
        const span = document.createElement('span');
        span.classList.add('caret');
        span.innerHTML = opt.label;
        newEl.appendChild(span);
        const newUl = document.createElement('ul');
        newUl.classList.add('nested');
        newEl.appendChild(newUl);
        root.appendChild(newEl);
        this.createTreeview(opt.children, newUl);
      } else {
        const newEl = document.createElement('li');
        newEl.innerHTML = opt.label;
        root.appendChild(newEl);
      }
    });
  }
}

customElements.define('app-treeview', Treeview);
