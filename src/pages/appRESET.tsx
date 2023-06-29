// const [message, setMessage] = useState('');
//   const [values, setValues] = useState<any>();
//   const [listGames, setListGames] = useState<any>([])
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = listGames.slice(indexOfFirstItem, indexOfLastItem);


//   const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
//     setCurrentPage(page);
//   };

//   useEffect(() => {
//     fetch('http://localhost:3001')
//       .then(response => response.text())
//       .then(data => setMessage(data))
//       .catch(error => console.log(error));
//   }, []);

//   const handleRegisterGame = () => {
//     axios.post("http://localhost:3001/register", {
//       name: values.name,
//       cost: values.cost,
//       category: values.category,
//     }).then(() => {
//       axios.post("http://localhost:3001/search", {
//         name: values.name,
//         cost: values.cost,
//         category: values.category,
//       }).then((response) => {
//         setListGames([
//           ...listGames,
//           {
//             id: response.data[0].id,
//             name: values.name,
//             cost: values.cost,
//             category: values.category,
//           },
//         ]);
//       });
//     });
//   };

//   const handleSearchGames = () => {
//     axios.post("http://localhost:3001/search", {
//       name: values.name,
//       cost: values.cost,
//       category: values.category,
//     }).then((response) => {
//       setListGames([
//         ...listGames,
//         {
//           id: response.data[0].id,
//           name: values.name,
//           cost: values.cost,
//           category: values.category,
//         },
//       ]);
//     });
//   }

//   useEffect(() => {
//     axios.get("http://localhost:3001/getCards").then((response) => {
//       setListGames(response.data)
//     })
//   }, [])

//   const handleChangeValues = (value: any) => {
//     setValues((prevValue: any) => ({
//       ...prevValue,
//       [value.target.name]: value.target.value,

//     }))
//   }