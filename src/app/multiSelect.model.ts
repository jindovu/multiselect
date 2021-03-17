
export class MultiSelectList {
  label: string;
  name: string;
  checked: boolean;
  items: Array<MultiSelectItem>
}

export class MultiSelectItem {
  label: string;
  name: string;
  checked: boolean;
}
