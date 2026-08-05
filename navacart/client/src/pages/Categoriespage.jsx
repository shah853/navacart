import { Link } from 'react-router-dom';

const categories = [
  { name: 'Men', emoji: '', slug: 'Men' },
  { name: 'Women', emoji: '', slug: 'Women' },
  { name: 'Kids', emoji: '', slug: 'Kids' },
  { name: 'Shoes', emoji: '', slug: 'Shoes' },

  { name: 'Watches', emoji: '', slug: 'Watches' },
];

function Categoriespage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Shop by Category</h1>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              <span className="text-4xl">{cat.emoji}</span>
              <span className="font-semibold text-slate-800">{cat.name}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Categoriespage;