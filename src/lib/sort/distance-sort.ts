import { PlaceDetailsType } from "../types/place-detail";

export default function quickDistanceSort(
  arr: PlaceDetailsType[]
): PlaceDetailsType[] {
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

  return [...quickDistanceSort(left), pivot, ...quickDistanceSort(right)];
}
