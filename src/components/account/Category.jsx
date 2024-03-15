import React from 'react'
import { CategoryData } from '../../data.jsx'
import { Table, TableRow, TableHead, TableCell, TableBody, Button } from '@mui/material'
import { styled } from '@mui/system'
import { NavLink } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
const MyStyledTable = styled(Table)({
    border: '1px solid rgba(224,224,224,5)'
});
const MyButton = styled(Button)({
    width: '80%',
    marginLeft: '25px',
    marginBottom: '10px'

})
const Category = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const alertNoCategory = () => {
        if (!category) {
            alert('Please select a category before creating a blog.');
        }
    };
    return (
        <div>
            <NavLink to={category ? `/create?create=${category}` : '/'} onClick={alertNoCategory}>
                <MyButton variant="contained">Create blog</MyButton>
            </NavLink>
            <MyStyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell  >
                            <NavLink to='/'>
                                   All BLOGS
                            </NavLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        CategoryData.map(data => (
                            <TableRow key={data.id}>
                                <TableCell className='hover:bg-slate-200' >
                                    <NavLink to={`/?category=${data.type}`} className="block w-full h-full p-2  rounded-md">
                                        {data.type}
                                    </NavLink>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </MyStyledTable>
        </div>
    )
}

export default Category
