import React, { ChangeEvent, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import { faseFilterKeys, specieFilterKeys } from '@/types/enums'
import PetSpecieIcon from '@/components/pet/PetSpecieIcon'

import { FaseFilter, SpecieFilter } from '@/types/pets'
import PetFaseIcon from './PetFaseIcon'
import PetSelectState from './PetSelectState'
import PetSelectCity from './PetSelectCity'
import { findState } from '@/helpers/FindState'
import Earth from 'mdi-material-ui/Earth'
import CityVariant from 'mdi-material-ui/CityVariant'

interface PetFilterProps {
  specieFilter: SpecieFilter
  setSpecieFilter: (specie: SpecieFilter) => void
  faseFilter: FaseFilter
  setFaseFilter: (fase: FaseFilter) => void
  nameFilter: string
  setNameFilter: (name: string) => void
  cityFilter: string
  setCityFilter: (city: string) => void
  stateFilter: string
  setStateFilter: (state: string) => void
}

const PetFilter = ({
  setSpecieFilter,
  specieFilter,
  faseFilter,
  setFaseFilter,
  setNameFilter,
  nameFilter,
  cityFilter,
  setCityFilter,
  stateFilter,
  setStateFilter,
}: PetFilterProps) => {
  useEffect(() => {
    setFaseFilter('ALL')
  }, [specieFilter, setFaseFilter])

  useEffect(() => {
    if (stateFilter !== findState(cityFilter)) {
      setCityFilter('')
    }
  }, [stateFilter, setCityFilter, cityFilter])
  return (
    <>
      <div>
        <div className="flex justify-center">
          {' '}
          <Earth className="-mb-[14px] z-10 bg-FindAfriendRed" />
        </div>
        <PetSelectState state={stateFilter} setState={setStateFilter} />
      </div>
      <div>
        <div className="flex justify-center">
          {' '}
          <CityVariant className="-mb-[14px] z-10 bg-FindAfriendRed" />
        </div>
        <PetSelectCity
          city={cityFilter}
          state={stateFilter}
          setCity={setCityFilter}
        />
      </div>
      <Divider />
      <h3 className="font-title ml-3">Filters</h3>
      <TextField
        label="Specie"
        value={specieFilter}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSpecieFilter(event.target.value as SpecieFilter)
        }
        select
        fullWidth
      >
        {specieFilterKeys.map((specie) => (
          <MenuItem key={specie} value={specie}>
            <div className="flex items-center">
              <PetSpecieIcon specie={specie} />
              {specie}
            </div>
          </MenuItem>
        ))}
      </TextField>
      {specieFilter !== 'ALL' && (
        <TextField
          label="Fase"
          value={faseFilter}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setFaseFilter(event.target.value as FaseFilter)
          }
          select
          fullWidth
        >
          {faseFilterKeys.map((fase) => (
            <MenuItem key={fase} value={fase}>
              <div className="flex items-center">
                <PetFaseIcon fase={fase} />
                {fase}
              </div>
            </MenuItem>
          ))}
        </TextField>
      )}
      <TextField
        label="Name"
        value={nameFilter}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setNameFilter(event.target.value)
        }
        fullWidth
      />
    </>
  )
}

export default PetFilter