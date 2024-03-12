import { PlaceDetailsType } from "../types/place-detail";

export default function quickSort(arr: PlaceDetailsType[]): PlaceDetailsType[] {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i].distance! < pivot.distance!) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}
