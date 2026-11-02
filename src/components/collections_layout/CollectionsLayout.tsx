import { useEffect, useRef, useState } from "react";
import "./collections_layout.css";
import { LIMIT } from "../../constants/constants";
import axios from "axios";
import { getCollections, getSpecializations } from "../../api/requests";
import { useSearchParams } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import CollectionsList from "../collections_list/CollectionsList";
import filter from "../../assets/filter.png";
import type {
  Collection,
  CollectionFilters,
  Specialization,
} from "../../types/collections.types";
import Sidebar from "../sidebar/Sidebar";
import CollectionPagination from "../collection_pagination/CollectionPagination";

export default function CollectionsLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const specParam = searchParams.get("specialization")
    ? Number(searchParams.get("specialization"))
    : 11;

  const isFreeParam = searchParams.has("isFree")
    ? searchParams.get("isFree") === "true"
    : null;

  const [collections, setCollections] = useState<Collection[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState<CollectionFilters>({
    specialization: specParam,
    search: searchParam,
    isFree: isFreeParam,
  });
  const controllerRef = useRef<AbortController>(null);

  const updateFilter = (newParams: CollectionFilters) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      Object.entries(newParams).forEach(([key, value]) => {
        const isEmpty =
          value === "" ||
          value === undefined ||
          value === null ||
          (Array.isArray(value) && value.length === 0);

        if (isEmpty) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      return params;
    });

    setFilters((prev) => ({
      ...prev,
      ...newParams,
    }));
    setCurrentPage(1);
  };

  const fetchCollections = async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();

    controllerRef.current = controller;

    setError("");

    setLoading(true);
    try {
      const { data, total } = await getCollections({
        page: currentPage,
        limit: LIMIT,
        filters,
        signal: controller.signal,
      });

      setTotalPages(Math.ceil((total || 0) / LIMIT));

      setCollections(data || []);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Запрос отменен");
        return;
      }
      console.error("Ошибка при загрузке вопросов:", error);
      setError("Не удалось загрузить вопросы");

      setCollections([]);
      setTotalPages(0);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [currentPage, filters]);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const { data } = await getSpecializations();

        setSpecializations(data || []);
      } catch (error) {
        console.error("Ошибка загрузки специализаций:", error);
      }
    };

    fetchSpecializations();
  }, []);

  return (
    <main>
      <div className="container">
        <div className="collections-layout">
          <div className="collections-column">
            <div className="collections-header">
              <h1 className="collections-title">Коллекции</h1>

              <img
                onClick={() => setOpenFilter(true)}
                className="collections-filter"
                src={filter}
                alt="Фильтр"
              />
            </div>
            {loading && <Spinner />}
            {!loading && error && (
              <div className="collections-error">
                <p className="collections-error__text">{error}</p>
                <button
                  className="collections-error__btn"
                  onClick={() => fetchCollections()}
                >
                  Повторить попытку
                </button>
              </div>
            )}
            {!loading && !error && (
              <>
                <CollectionsList collections={collections} />

                {totalPages > 1 && (
                  <CollectionPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>

          <Sidebar
            isOpen={openFilter}
            onClose={() => setOpenFilter(false)}
            specializations={specializations}
            filters={filters}
            onUpdateFilter={updateFilter}
          />
        </div>
      </div>
    </main>
  );
}
