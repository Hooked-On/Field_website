import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_API_URL);

pb.autoCancellation(false);

export function CampApi() {
  return pb.collection('camp').getFullList({});
}

export function NewsApi(selectCategory) {
  return pb.collection('News').getFullList({
    filter: `category="${selectCategory}"`,
  });
}

export function NewsMonthApi(title) {
  return pb.collection('NewsDetail').getFullList({
    filter: `title="${title}"`,
  });
}

export function NewsDetailApi(id) {
  return pb.collection('NewsDetail').getFirstListItem(`id="${id}"`, {
    expand: 'contents',
  });
}

export function ReviewApi() {
  return pb.collection('Review').getFullList();
}

export function ProfileApi() {
  return pb.collection('Profile').getFullList();
}

export function DepartmentApi() {
  return pb.collection('Department').getFullList();
}

export function LoadDateData() {
  return pb.collection('Recruit').getFullList();
}
